import {RecentNotification} from "./RecentNotification";

export function RecentNotificationsContainer(props) {
    return <div className="latest-cards">
        <RecentNotification {...props} />
        <RecentNotification {...props} />
        <RecentNotification {...props} />
        <RecentNotification {...props} />
        <RecentNotification {...props} />
        <RecentNotification {...props} />
    </div>
}
