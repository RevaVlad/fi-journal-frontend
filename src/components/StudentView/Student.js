import {MainContent} from "./MainContent";
import {RecentNotificationsContainer} from "./RecentNotification";
import {UserData} from "../../models";

export function Student(props){
    var userData = new UserData(props.userId)

    return <>
        {//<RecentNotificationsContainer userData={userData}/>}
        }
        <MainContent userData={userData}/>
    </>
}
