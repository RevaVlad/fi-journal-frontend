import styles from '../../styles/RecentNotifications.module.css'
import shared from '../../styles/shared.module.css'
import {checkIfDatesEqual, getSubjectColor} from "../../utils";
import {useUserRecentChanges} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {truncateString, useWaitFor} from "../utils";
import {columnNameLimit} from "../../configuration";

export function RecentNotificationsContainer({userInfo, tableRefs, tablesAreLoaded}) {
    const [allRecentUpdates, status, isLoading] = useUserRecentChanges(userInfo.id)
    const isCompleted = useWaitFor(() => {
        return tablesAreLoaded.current
    }, 100)

    if (isLoading) {
        return <div style={{display: "flex", justifyContent: "center", alignContent: "center", margin: "20px"}}>
            <Loading scale={0.05}/>
        </div>
    }

    if (status !== 200 || allRecentUpdates.length < 1 || !isCompleted) {
        return <></>
    }

    return <div className={shared.whiteContainer}>
        <span className={shared.importantLabel + " text-[30px]"}>Последние изменения</span>
        <div className="flex overflow-x-auto whitespace-nowrap gap-4 flex-row pt-0 pb-2.5">
            {allRecentUpdates.slice(0, 10).map((updateInfo, i) => <RecentNotification key={i} updateInfo={updateInfo} tableRefs={tableRefs}/>)}
        </div>
    </div>
}

export function RecentNotification({updateInfo, tableRefs}) {
    const truncatedColumn = truncateString(updateInfo.column, columnNameLimit, "...")

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
        <Grade updateInfo={updateInfo} tableRef={tableRefs.current[updateInfo.tableId]}/>
        <div className={shared.clarification}>
            {updateInfo.tableName}
            <span className={shared.smallerClarification}>{truncatedColumn}</span>
        </div>
    </div>
}

export function Grade({updateInfo, tableRef}) {
    const subjectColor = getSubjectColor(updateInfo.tableId)

    const scroll = () => {
        tableRef.scrollIntoView( { behavior: 'smooth', block: 'center' } );
    }

    return <button onClick={scroll}
                   className={shared.squareAround + " " + styles.value}
          style={{backgroundColor: subjectColor}}>{updateInfo.grade}
    </button>
}
