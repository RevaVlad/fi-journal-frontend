// import {BackendServerAddress} from "./components/configuration";
// TODO: change to fi-journal.ru

const backendPrefix = "http://localhost:8080/api/";
// const backendPrefix = "https://fi-journal.ru/api/";

class FetchError extends Error {
    statusCode;

    constructor(message, statusCode = 400) {
        super();
        this.statusCode = statusCode;
    }
}

export function createPatchFetcher(postfix) {
    return fetch(backendPrefix + postfix, {
        method: 'PATCH',
        credentials: "include"
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('There was a problem with patch request', error);
        });
}

export function createGetFetcher(postfix) {
    const init = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return fetch(backendPrefix + postfix, init)
        .then((response) => {
            if (!response.ok) {
                throw new FetchError("Problem with get request", response.status);
            }
            return response.json();
        })
        .then((data) => {
            return [data, 200];
        })
        .catch((error) => {
            return [undefined, error.statusCode];
        });
}

export function createPostFetcher(postfix, body, responseProcessor, credentials) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (credentials) init['credentials'] = 'include'

    return fetch(backendPrefix + postfix, init)
        .then((response) => {
            if (!response.ok) {
                throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
            }
            return [responseProcessor(response), 200];
        })
        .catch((error) => {
            console.error('Problem with fetch operation', error);
            return [undefined, error.statusCode]
        });
}

export function createDeleteFetcher(postfix, body) {
    return fetch(backendPrefix + postfix, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (!response.ok) {
                throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
            }
            return response.json();
        })
        .then((data) => {
            return [data, 200];
        })
        .catch((error) => {
            console.error('There was a problem with delete operation', error);
            return [undefined, error.statusCode]
        });
}

// function wrapWithErrorProcessing(fetcher, errorMessage) {
//     return fetcher.then((response) => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//     })
// }
