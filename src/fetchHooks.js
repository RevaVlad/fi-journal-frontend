import {UserData} from "./UserData";
import {getUserInfoFetcher} from "./fetcherTemplates";

export function createUserFetcher(name, surname, email, password) {
    const postfix = 'Users/register'
    const body = {
        'name': `${surname} ${name}`,
        'password': password,
        'email': email
    }
    const responseProcessor = (response) => response.json()
    return () => createPostFetcher(postfix, body, responseProcessor, false)

    // return fetch(backendPrefix + 'Users/register', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //     })
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         return [data['id'], 200];
    //     })
    //     .catch((error) => {
    //         return ["", error.statusCode]
    //     });
}

export async function login(email, password){
    const postfix = 'Users/login'
    const body = {
        'email': email,
        'password': password,
    }
    const responseProcessor = (response) => response.text()
    return createPostFetcher(postfix, body, responseProcessor, false)

    // return await fetch(backendPrefix + 'Users/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         'email': email,
    //         'password': password,
    //     })
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
    //         }
    //         return response.text();
    //     })
    //     .then((data) => {
    //         return [data, 200];
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation:', error);
    //         return ["", error.statusCode]
    //     });
}

export const getUserInfoFetcher = () => {
    const postfix = 'Users/profile'
    return createGetFetcher(postfix);
    //
    // return await fetch(backendPrefix + 'Users/profile', {
    //     method: 'GET',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation, while loading user info:', error);
    //     });
}

export function getGroupInfo(id) {
    const postfix = 'Groups/' + id
    return createGetFetcher(postfix);
    // return await fetch(backendPrefix + 'Groups/' + id, {
    //     method: 'GET',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation, while loading group info:', error);
    //     });
}

export async function addUserToGroup(userId, groupId){
    const postfix = `Groups/${groupId}/users`
    const body = {
        'userId': userId
    }
    const responseProcessor = (response) => response.json()
    return createPostFetcher(postfix, body, responseProcessor, true)

    // return await fetch(backendPrefix + `Groups/${groupId}/users`, {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //     })
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new FetchError(`HTTP error! status: ${response.status}`, response.status);
    //         }
    //         return response.json();
    //     })
    //     .then(() => {
    //         return ["", 200];
    //     })
    //     .catch((error) => {
    //         return ["", error.statusCode]
    //     });
}

export function getTableInfo(id){
    const postfix = 'Tables/' + id
    return createGetFetcher(postfix);

    // return await fetch(backendPrefix + 'Tables/' + id, {
    //     method: 'GET',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation, while loading table info:', error);
    //     });
}

export function getUserPointInTable(userId, tableId){
    // TODO: перенести в хук
    //  return Object.entries(data).map(([key, value]) => [key, value])
    const postfix = 'Tables/' + tableId + '/userPoints/' + userId
    return createGetFetcher(postfix)
    // return await fetch(backendPrefix + 'Tables/' + tableId + '/userPoints/' + userId, {
    //     method: 'GET',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return Object.entries(data).map(([key, value]) => [key, value])
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation, while loading table info:', error);
    //     });
}

export async function patchUser(id, newEmail, newPassword) {
    let query = '?'

    if (newEmail){
        query += `email=${encodeURIComponent(newEmail)}`
    }
    if (newPassword){
        query += `&password=${encodeURIComponent(newPassword)}`
    }

    const postfix = 'Users/' + id + query
    return createPatchFetcher(postfix)

    // return await fetch(backendPrefix + 'Users/' + id + query, {
    //     method: 'PATCH',
    //     credentials: "include"
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with the fetch operation, while loading table info:', error);
    //     });
}

export async function deleteUserFromGroup(groupId, userId) {
    const postfix = 'Groups/' + groupId + "/users"
    const body = {
        "userId": userId
    }

    return createDeleteFetcher(postfix, body)
    // return await fetch(backendPrefix + postfix, {
    //     method: 'DELETE',
    //     credentials: "include",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         "userId": userId
    //     })
    // })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error('There was a problem with delete operation, when leaving group', error);
    //     });
}
