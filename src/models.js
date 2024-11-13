import {
    getGroupIdsOfUser,
    getGroupName, getTableLink,
    getTableName,
    getTableRecentUpdates,
    getTablesIdsOfGroup,
    getUserEmail
} from "./backendRequests";

export class UserData {
    constructor(username) {
        this.username = username;
        this.email = getUserEmail(username)
        this.groups = getGroupIdsOfUser(username).map(id => Group.fromId(id))
    }
}

class Group {
    constructor(id, name, tables) {
        this.id = id
        this.name = name
        this.tables = tables
    }

    withTables(tables) {
        return new Group(this.id, this.name, tables)
    }

    static fromId(id){
        let name = getGroupName(id)
        let tableIDs = getTablesIdsOfGroup(id)
        let tables = tableIDs.map(id => new Table(id))
        return new Group(id, name, tables)
    }
}

class Table {
    constructor(id) {
        this.id = id
        this.name = getTableName(id)
        this.recentUpdates = []
        this.link = getTableLink(id)

        let recentUpdates = getTableRecentUpdates(id)
        for (let recentUpdate of recentUpdates) {
            let date = recentUpdate[0]
            let thisDateUpdates = recentUpdate.slice(1).map(x => new UpdateInfo(date, x[0], x[1]))
            this.recentUpdates = this.recentUpdates.concat(thisDateUpdates)
        }
        this.recentUpdates.sort((a, b) => a.compare(b))
    }
}

class UpdateInfo {
    constructor(date, column, grade) {
        this.date = date
        this.column = column
        this.grade = grade
    }

    compare(otherUpdate){
        return otherUpdate.date - this.date
    }
}