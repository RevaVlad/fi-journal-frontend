export class UserInfo {
    id;
    email;
    groupsIds;
    surname;
    name;

    constructor(data) {
        this.id = data['id'];
        this.email = data['email'];

        const fullname = data['name'].split(' ')
        this.surname = fullname[0]
        this.name = fullname[1]

        this.groupsIds = data['groupIds']

        this.isEmailVerified = data['isEmailConfirmed']
    }
}

export class GroupInfo {
    id;
    name;
    tableIds;

    constructor(data) {
        this.id = data['id']
        this.name = data['name']
        this.tableIds = data['tableIds']
    }

    withTables(tables) {
        let group = new GroupInfo(this.id, this.name, tables.map(table => table.id))
        group.tables = tables
        return group
    }
}

export class TableInfo {
    id;
    name;
    recentUpdates;
    link;

    constructor(data) {
        this.id = data['id']
        this.name = data['name']
        this.link = data['url']
    }
}

export class UpdateInfo {
    date;
    column;
    grade;
    tableId;
    tableName;

    constructor(date, column, grade, tableId, tableName) {
        this.date = date
        this.column = column
        this.grade = grade
        this.tableId = tableId
        this.tableName = tableName
    }

    compare(otherUpdate){
        return otherUpdate.date - this.date
    }
}