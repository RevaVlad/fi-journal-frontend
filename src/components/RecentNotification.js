import styles from '../components-styles/RecentNotifications.module.css'
import { isMobile } from "react-device-detect";

export function RecentNotification(props) {
    return <div className={styles.card}>
        <span className={styles.date}>Сегодня</span>
        <span className={styles.value}>0.1</span>
        <div className={styles.subject}>
            <span className="label">Мат. Анализ</span>
        </div>
    </div>
}

export function RecentNotificationsContainer(props) {
    return <>
        <span className={isMobile ? "ont-bold pl-2.5 text-[25px] pt-0" : "font-bold pl-2.5 text-[30px] pt-2.5"}>Последнeе</span>
        <div className="flex overflow-x-scroll whitespace-nowrap gap-4 flex-row pt-0 pb-2.5 px-2.5">
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
            <RecentNotification {...props} />
        </div>
    </>
}
