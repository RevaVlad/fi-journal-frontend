import styles from '../../styles/RecentNotifications.module.css'
import shared from '../../styles/shared.module.css'
import {checkIfDatesEqual, getSubjectColor} from "../../utils";

export function RecentNotificationsContainer(props) {
    let allRecentUpdates = []
    for (let group of props.userData.groups)
        for (let table of group.tables)
            for (let update of table.recentUpdates)
                allRecentUpdates = allRecentUpdates.concat(<RecentNotification group={group.name}
                                                                               subject={table.name}
                                                                               updateInfo={update}/>)

    return <div className={shared.whiteContainer}>
        <span className={shared.importantLabel + " text-[30px]"}>Последнeе</span>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4 flex-row pt-0 pb-2.5">
            {allRecentUpdates.slice(0, 10)}
        </div>
    </div>
}

export function RecentNotification(props) {
    let date;
    if (checkIfDatesEqual(props.updateInfo.date, new Date())){
        date = "Сегодня"
    }
    else{
        date = props.updateInfo.date.toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: '2-digit'
        });
    }

    return <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <span className={shared.squareAround + " " + styles.value}
              style={{backgroundColor: getSubjectColor(props.group, props.subject)}}>{props.updateInfo.grade}</span>
        <div className={shared.clarification}>
            {props.subject}
            <span className={shared.smallerClarification}>{props.updateInfo.column}</span>
        </div>
    </div>
}
