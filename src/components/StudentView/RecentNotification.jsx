import styles from '../../styles/RecentNotifications.module.css'
import shared from '../../styles/shared.module.css'
import {checkIfDatesEqual, getSubjectColor} from "../../utils";
import {useUserRecentChanges} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";

export function RecentNotificationsContainer({userInfo}) {
    let [allRecentUpdates, status, isLoading] = useUserRecentChanges(userInfo.id)

    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignContent: "center", margin: "20px"}}><Loading scale={0.05}/></div>
    }

    if (status !== 200 || allRecentUpdates.length < 1) {
        return <></>
    }

    return <div className={shared.whiteContainer}>
        <span className={shared.importantLabel + " text-[30px]"}>Последние изменения</span>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4 flex-row pt-0 pb-2.5">
            {allRecentUpdates.slice(0, 10).map((updateInfo, i) => <RecentNotification key={i} updateInfo={updateInfo}/>)}
        </div>
    </div>
}

export function RecentNotification({updateInfo}) {
    let date;
    if (checkIfDatesEqual(updateInfo.date, new Date())){
        date = "Сегодня"
    }
    else{
        date = updateInfo.date.toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: '2-digit'
        });
    }

    return <div className={styles.card}>
        <span className={styles.date}>{date}</span>
        <span className={shared.squareAround + " " + styles.value}
              style={{backgroundColor: getSubjectColor(updateInfo.tableId)}}>{updateInfo.grade}</span>
        <div className={shared.clarification}>
            {updateInfo.tableName}
            <span className={shared.smallerClarification}>{updateInfo.column}</span>
        </div>
    </div>
}
