// import {BackendServerAddress} from "./components/configuration";
const testUserId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljZmZlZGI3LWVlNzAtNGI3MS05M2IwLTFjODgxZTI4NTI0NCIsIm5hbWUiOiJ2IHYiLCJleHAiOjE3MzIxNzU4MTF9.DTboaltKUWRnU1fodeP5jCrj9cxoBO6dqHskIu6_9Fc"

export async function createUser(name, surname, email, password) {
    console.log("Creating new user request...")
    return await fetch('http://localhost/api/Users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': `${surname} ${name}`,
            'password': password,
            'email': email
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data['id'];
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export async function login(email, password){
    console.log("Logging in request...")
    return await fetch('http://localhost/api/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
        })
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            console.log(`User successfully logged in ${email} with token ${data}`)
            return data;
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

export async function getUserInfo() {
    console.log("Getting user info request...")
    return await fetch('http://localhost/api/Users/profile', {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
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
            console.error('There was a problem with the fetch operation, while loading user info:', error);
        });
}

export async function getGroupInfo(id) {
    console.log("Getting group info request...")
    return await fetch('http://localhost/api/Groups/' + id, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
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
            console.error('There was a problem with the fetch operation, while loading group info:', error);
        });
}

export async function getTableInfo(id){
    console.log("Getting table info request...")
    return await fetch('http://localhost/api/Tables/' + id, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
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
            console.error('There was a problem with the fetch operation, while loading table info:', error);
        });
}

export async function getUserPointInTable(userId, tableId){
    console.log("Getting user points request...")
    return await fetch('http://localhost/api/Tables/' + tableId + '/userPoints/' + userId, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return Object.entries(data).map(([key, value]) => [key, value])
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation, while loading table info:', error);
        });
}

export async function patchUser(id, newEmail, newPassword) {
    console.log("Patching user info request...")
    let query = '?'

    if (newEmail){
        query += `email=${encodeURIComponent(newEmail)}`
    }
    if (newPassword){
        query += `&password=${encodeURIComponent(newPassword)}`
    }

    return await fetch('http://localhost/api/Users/' + id + query, {
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
            console.error('There was a problem with the fetch operation, while loading table info:', error);
        });
}

// export function changeUserName(userId){
//
// }
//
// export function changeUserPassword(userId){
//
// }
//
// export function changeUserEmail(userId){
//
// }
