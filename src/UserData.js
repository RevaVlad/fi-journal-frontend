import {
    getGroupInfo,
    getTableInfo,
    getUserInfoFetcher, getUserPointInTable
} from "./fetcherTemplates";

export class UserData {
    id;
    email;
    groupsIds;
    surname;
    name;
    groups;
    isInitialized;

    constructor(data) {
        this.id = data['id'];
        this.email = data['email'];

        const fullname = data['name'].split(' ')
        this.surname = fullname[0]
        this.name = fullname[1]

        this.groupsIds = data['groupIds']
        this.groups = []
        this.isInitialized = false
    }

    // static async fromToken(){
    //     const userInfo = await getUserInfo()
    //     return new UserData(userInfo)
    // }

    async initializeGroupsInfo() {
        if (this.isInitialized) return
        for (const groupId of this.groupsIds){
            this.groups.push(await Group.fromId(groupId))
        }
        this.isInitialized = true;
        console.log("Initialized groups info of user")
    }
}

class Group {
    id;
    name;
    tables;
    isInitialized

    constructor(id, name, tablesIds) {
        this.id = id
        this.name = name
        this.tableIds = tablesIds
        this.tables = []
        this.isInitialized = false
    }

    static async fromId(id){
        const groupInfo = await getGroupInfo(id)
        let name = groupInfo['name']
        let tablesIds = groupInfo['tableIds']
        return new Group(id, name, tablesIds)
    }

    async initializeTablesInfo() {
        if (this.isInitialized) return
        this.tables = []
        for (const tableId of this.tableIds){
            this.tables.push(await Table.fromId(tableId))
        }
        this.isInitialized = true
        console.log("Initialized tables info of group", this.tables)
    }

    withTables(tables) {
        let group = new Group(this.id, this.name, tables.map(table => table.id))
        group.tables = tables
        return group
    }
}

class Table {
    id;
    name;
    recentUpdates;
    link;
    isInitialized;

    constructor(id, name, link, recentUpdates) {
        this.id = id
        this.name = name
        this.recentUpdates = recentUpdates
        this.link = link
        this.points = []
        this.isInitialized = false
    }

    static async fromId(id){
        let tableInfo = await getTableInfo(id)
        return new Table(id, tableInfo['name'], tableInfo['url'], [])
        // let recentUpdates = getTableRecentUpdates(id)
        // for (let recentUpdate of recentUpdates) {
        //     let date = recentUpdate[0]
        //     let thisDateUpdates = recentUpdate.slice(1).map(x => new UpdateInfo(date, x[0], x[1]))
        //     this.recentUpdates = this.recentUpdates.concat(thisDateUpdates)
        // }
        // this.recentUpdates.sort((a, b) => a.compare(b))
    }

    async initializeUserPoints(userId){
        if (this.isInitialized) return
        this.points = await getUserPointInTable(userId, this.id)
        this.isInitialized = true;
    }

    async getUserRecentUpdates(userId){
        return []
    }
}

// class UpdateInfo {
//     date;
//     column;
//     grade;
//
//     constructor(date, column, grade) {
//         this.date = date
//         this.column = column
//         this.grade = grade
//     }
//
//     compare(otherUpdate){
//         return otherUpdate.date - this.date
//     }
// }