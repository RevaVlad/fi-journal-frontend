import shared from "../../styles/shared.module.css"
import {GroupsInfo} from "./GroupsInfo";
import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {FailedToLoadUserDataMessage, NoGroupsMessage} from "../Shared/Messages";
import {RecentNotificationsContainer} from "./RecentNotification";

export function Student(){
    const [userInfo, status, isLoading] = useUserInfo()

    if (isLoading){
        return <div className={shared.centerOfScreen} style={{width: "100%", height: "100%"}}><Loading scale={0.05}/></div>
    }
    if (status !== 200){
        return <div style={{marginTop: "20px"}}>
            <FailedToLoadUserDataMessage/>
        </div>
    }
    if (status !== 200 || userInfo.groupsIds.length < 1){
        return <div style={{marginTop: "20px"}}>
            <NoGroupsMessage/>
        </div>
    }

    return <>
        <RecentNotificationsContainer userInfo={userInfo}/>
        <GroupsInfo userInfo={userInfo}/>
    </>
}
