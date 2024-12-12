import {
    createDeleteFetcher,
    createGetFetcher,
    createPatchFetcher,
    createPostFetcher,
    ResponseTypes
} from "./basicFetchers";

export function createUserCreationFetcher(name, surname, email, password) {
    const postfix = 'Users/register'
    const body = {
        'name': `${surname} ${name}`,
        'password': password,
        'email': email
    }

    return createPostFetcher(postfix, body, ResponseTypes.JSON, false)
}

export function createSignInFetcher(email, password){
    const postfix = 'Users/login'
    const body = {
        'email': email,
        'password': password,
    }
    return createPostFetcher(postfix, body, ResponseTypes.TEXT, false)
}

export const createGetUserInfoFetcher = () => {
    return createGetFetcher('Users/profile')
}

export function createGetGroupInfoFetcher(id) {

    const postfix = 'Groups/' + id
    return createGetFetcher(postfix);
}

export function createAddUserToGroupFetcher(userId, groupId){
    const postfix = `Groups/${groupId}/users`
    const body = {
        'userId': userId
    }
    return createPostFetcher(postfix, body, ResponseTypes.JSON, true)
}

export function createGetTableInfoFetcher(id, userId){
    // TODO: change to postfix
    const postfix = 'Tables/' + id + '/' + userId
    return createGetFetcher('Tables/' + id);
}

export function createGetUserPointInTableFetcher(userId, tableId){
    const postfix = 'Tables/' + tableId + '/userPoints/' + userId
    return createGetFetcher(postfix)
}

export function createPatchUserFetcher(id, newEmail, newPassword) {
    let query = '?'

    if (newEmail){
        query += `email=${encodeURIComponent(newEmail)}`
    }
    if (newPassword){
        query += `&password=${encodeURIComponent(newPassword)}`
    }

    const postfix = 'Users/' + id + query
    return createPatchFetcher(postfix)
}

export function createGetUserRecentChangesFetcher(id){
    return createGetFetcher("Users/" + id + "/recentDiffs")
}

export function createDeleteUserFromGroupFetcher(groupId, userId) {
    const postfix = 'Groups/' + groupId + "/users"
    const body = {
        "userId": userId
    }

    return createDeleteFetcher(postfix, body)
}
