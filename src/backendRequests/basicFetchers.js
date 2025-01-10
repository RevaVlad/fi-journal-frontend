import {BackendServerAddress, verbose} from "../configuration";

export class ResponseTypes {
    static #_TEXT = 0;
    static #_JSON = 1;

    static get TEXT() { return this.#_TEXT; }
    static get JSON() { return this.#_JSON; }
}

class FetchError extends Error {
    statusCode;

    constructor(message, statusCode = 400) {
        super();
        this.statusCode = statusCode;
    }
}

export function createPatchFetcher(postfix) {
    if (verbose) console.log("Patch", postfix);

    const init = {
        method: 'PATCH',
        credentials: "include",
    }

    return fetch(BackendServerAddress + postfix, init)
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
            if (verbose) console.error(`Problem with patch operation`, error);
            return [undefined, error.statusCode]
        });
}

export function createGetFetcher(postfix, signal = null) {
    if (verbose) console.log("Get fetch", postfix)

    const init = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (signal)
        init['signal'] = signal

    return fetch(BackendServerAddress + postfix, init)
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

export function createPostFetcher(postfix, body, responseType, credentials) {
    if (verbose) console.log("POST", postfix);
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }

    if (credentials) init['credentials'] = 'include'

    return fetch(BackendServerAddress + postfix, init)
        .then((response) => {
            if (!response.ok) {
                throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
            }

            if (responseType === ResponseTypes.JSON)
                return response.json()

            if (responseType === ResponseTypes.TEXT){
                return response.text()
            }

            throw new Error(`Unexpected argument: ${responseType}`);
        })
        .then((data) => {
            return [data, 200]
        })
        .catch((error) => {
            if (verbose) console.error('Problem with fetch operation', error);
            return [undefined, error.statusCode]
        });
}

export function createDeleteFetcher(postfix, body) {
    if (verbose) console.log("delete", postfix, body)
    return fetch(BackendServerAddress + postfix, {
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
            if (verbose) console.error('There was a problem with delete operation', error);
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
