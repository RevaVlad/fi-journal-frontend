import {
    createDeleteFetcher,
    createGetFetcher,
    createPatchFetcher,
    createPostFetcher,
    ResponseTypes
} from "./basicFetchers";
import {verbose} from "../configuration";

export function createUserCreationFetcher(name, surname, email, password) {
    const postfix = 'Users/register'
    const body = {
        'name': `${surname} ${name}`,
        'password': password,
        'email': email
    }

    return createPostFetcher(postfix, body, ResponseTypes.JSON, false)
}

export function createSignInFetcher(email, password, remember){
    const postfix = 'Users/login'
    const body = {
        'email': email,
        'password': password,
    }
    if (remember)
        body['remember'] = true

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
    const postfix = 'Tables/' + id + '/user/' + userId
    return createGetFetcher(postfix);
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

export function createVerificationMessage(userId){
    if (verbose) console.log("Отправляем сообщение на почту");
    const postfix = "Users/" + userId + "/confirmEmail"
    const body = {
    }

    return createPostFetcher(postfix, body, ResponseTypes.TEXT, true)
}
