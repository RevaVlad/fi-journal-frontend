import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {ProfileHeader} from "./ProfileHeader";
import {PersonalData} from "./PersonalData";
import {UserGroups} from "./UserGroups";
import {FailedToLoadUserDataMessage} from "../Shared/Messages";
import shared from "../../styles/shared.module.css"


export function UserProfile({setToken}){
    const [userInfo, status, isLoading] = useUserInfo()
    if (isLoading)
        return <div className={shared.centerOfScreen} style={{width: "100%", height: "100%"}}><Loading scale={0.05}/></div>

    if (status !== 200)
        return <div style={{marginTop: "20px"}}>
            <FailedToLoadUserDataMessage/>
        </div>

    return <ProfileMainContent userInfo={userInfo} setToken={setToken}/>
}

function ProfileMainContent({userInfo, setToken}){
    return <section style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <ProfileHeader userInfo={userInfo} setToken={setToken}/>
        <PersonalData userInfo={userInfo}/>
        <UserGroups userInfo={userInfo}/>
    </section>
}


