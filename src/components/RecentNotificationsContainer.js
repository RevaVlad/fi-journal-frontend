import {RecentNotification} from "./RecentNotification";
import '../components-styles/RecentNotificationContainer.css'

export function RecentNotificationsContainer(props) {
    return <>
        <h2 className="container-header">Последнeе</h2>
        <div className="container">
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
