import {BackendServerAddress} from "./components/configuration";

const testUserId = "43778592yhj13hjir32ofh0234u32h"

export function getUserId(username, password){
    if (username === "vladreva57@gmail.com" && password === "123")
        return testUserId
}

export function getGroupIdsOfUser(userId){
    if (userId === testUserId){
        return ["id-jfkldsajfls", "id-nbxnvx"]
    }
}

export function getUserEmail(userId){
    if (userId === testUserId){
        return "vladreva57@gmail.com"
    }
}

export function getGroupName(groupId){
    if (groupId === "id-jfkldsajfls"){
        return "ФТ-202"
    }
    else if (groupId === "id-nbxnvx"){
        return "ФТ-202-2"
    }
}

export function getTablesIdsOfGroup(groupId){
    if (groupId === "id-jfkldsajfls"){
        return ["id-aaaaaaa", "id-aaaaaab", "id-aaaxaab"]
    }
    else if (groupId === "id-nbxnvx"){
        return ["id-bbbbbb", "id-bbbbbbc"]
    }
}

export function getTableName(tableId){
    if (tableId === "id-aaaaaaa"){
        return "Матан"
    }
    else if (tableId === "id-aaaaaab"){
        return "Дискретка"
    }
    else if (tableId === "id-aaaxaab"){
        return "Тервер >:("
    }
    else if (tableId === "id-bbbbbb"){
        return "Матан"
    }
    else if (tableId === "id-bbbbbbc"){
        return "Дискретка"
    }
}

export function getTableLink(tableId){
    if (tableId === "id-aaaaaaa"){
        return "https://docs.google.com/spreadsheets/d/1PG56U0R1jJY_qob0Kjy0gZ1AzfcB49Y01V7vM-AvK_8/edit?gid=0#gid=0"
    }
    else if (tableId === "id-aaaaaab"){
        return ""
    }
    else if (tableId === "id-aaaxaab"){
        return ""
    }
    else if (tableId === "id-bbbbbb"){
        return ""
    }
    else if (tableId === "id-bbbbbbc"){
        return ""
    }

}

export function getTableRecentUpdates(tableId){
    if (tableId === "id-aaaaaaa"){
        return [
            [new Date("2024-11-09 19:22"), ["12.09", 1], ["14.09", 2]],
            [new Date("2024-11-09 13:50"), ["13.09", .1]]
        ]
    }
    else if (tableId === "id-aaaaaab"){
        return [
            [new Date("2024-10-10 19:22"), ["15.10", 1], ["18.10", .5]],
            [new Date("2024-09-12 19:21"), ["18.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
            [new Date("2024-09-12 19:19"), ["15.09", 0.1]]
        ]
    }
    else if (tableId === "id-aaaxaab"){
        return []
    }
    else if (tableId === "id-bbbbbb"){
        return [
            [new Date("2024-09-12 19:22"), [ "12.09", 1], ["14.09", 2]],
            [new Date("2024-08-24 13:50"), ["13.09", 0.1]]
        ]
    }
    else if (tableId === "id-bbbbbbc"){
        return [
            [new Date("2024-09-12 19:22"), ["15.10", 1], ["18.10", .5]],
            [new Date("2024-11-09 19:21"), ["18.09", 0.1]],
            [new Date("2024-09-12 19:20"), ["19.09", 0.1]],
            [new Date("2024-09-12 19:19"), ["15.09", 0.1]]
        ]
    }
}

/*
function makeRequest(additionalAddress, data, type){
    return fetch(BackendServerAddress + additionalAddress, {
        method: type,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
}
 */