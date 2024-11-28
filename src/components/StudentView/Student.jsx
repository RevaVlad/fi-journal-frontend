import {GroupsInfo} from "./GroupsInfo";
import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";

export function Student(){
    const [userInfo, status, isLoading] = useUserInfo()

    if (isLoading){
        return <Loading scale={0.05}/>
    }
    if (status !== 200){
        return <>Возникла проблема</>
    }

    return <>
        {//<RecentNotificationsContainer userData={userData}/>}
        }
        <GroupsInfo userInfo={userInfo}/>
    </>
}
