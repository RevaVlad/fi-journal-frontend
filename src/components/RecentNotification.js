import styles from '../styles/RecentNotifications.module.css'
import shared from '../styles/shared.module.css'
import {checkIfDatesEqual, getSubjectColor} from "../utils";
import '../backendRequests'
import {
    getGroupIdsOfUser,
    getGroupName,
    getTableName,
    getTableRecentUpdates,
    getTablesIdsOfGroup
} from "../backendRequests";

export function RecentNotificationsContainer(props) {
    const all_recent_grades = [];
    for (const groupId of getGroupIdsOfUser(props.username)) {
        let groupName = getGroupName(groupId)
        for (const tableId of getTablesIdsOfGroup(groupId)) {
            let recentUpdates = getTableRecentUpdates(tableId)
            let tableName = getTableName(tableId)
            for (var i = 0; i < recentUpdates.length; i++) {
                let update = recentUpdates[i]
                let updateDate = update[0]
                for (let j = 1; j < update.length; j++) {
                    all_recent_grades.push([updateDate].concat([groupName, tableName]).concat(update[j]))
                }
            }
        }
    }

    all_recent_grades.sort((a, b) => b[0] - a[0])

    return <>
        <span className={shared.importantLabel + " text-[30px]"}>Последнeе</span>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4 flex-row pt-0 pb-2.5">
            {all_recent_grades.slice(0, 10).map(gradeData => <RecentNotification date={gradeData[0]} group={gradeData[1]} subject={gradeData[2]} column={gradeData[3]} grade={gradeData[4]}/>)}
        </div>
    </>
}

export function RecentNotification(props) {
    let date;
    if (checkIfDatesEqual(props.date, new Date())){
        date = "Сегодня"
    }
    else{
        date = props.date.toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: '2-digit'
        });
    }

    return <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <span className={shared.squareAround + " " + styles.value} style={{backgroundColor: getSubjectColor(props.group, props.subject)}}>{props.grade}</span>
        <div className={shared.clarification}>
            {props.subject}
            <span className={shared.smallerClarification}>{props.column}</span>
        </div>
    </div>
}
