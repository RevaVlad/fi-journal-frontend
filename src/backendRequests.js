export function getGroupIdsOfUser(username){
    if (username === "Владислав Рева"){
        return ["id-jfkldsajfls", "id-nbxnvx"]
    }
}

export function getUserEmail(username){
    if (username === "Владислав Рева"){
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

export function getTableRecentUpdates(tableId){
    if (tableId === "id-aaaaaaa"){
        return [
            [new Date("2024-11-08 19:22"), ["12.09", 1], ["14.09", 2]],
            [new Date("2024-11-08 13:50"), ["13.09", 0.1]]
        ]
    }
    else if (tableId === "id-aaaaaab"){
        return [
            [new Date("2024-10-10 19:22"), ["15.10", 1], ["18.10", .5]],
            [new Date("2024-09-12 19:21"), ["18.09", 0.1]],
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
            [new Date("2024-09-12 19:21"), ["18.09", 0.1]],
            [new Date("2024-09-12 19:20"), ["19.09", 0.1]],
            [new Date("2024-09-12 19:19"), ["15.09", 0.1]]
        ]
    }
}
