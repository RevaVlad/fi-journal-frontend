import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {ProfileHeader} from "./ProfileHeader";
import {PersonalData} from "./PersonalData";
import {UserGroups} from "./UserGroups";


export function UserProfile(){
    const [userInfo, status, isLoading] = useUserInfo()
    if (isLoading || status !== 200)
        return <Loading scale={0.05} />

    return <ProfileMainContent userInfo={userInfo}/>
}

function ProfileMainContent({userInfo}){
    return <section style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <ProfileHeader userInfo={userInfo}/>
        <PersonalData userInfo={userInfo}/>
        <UserGroups userInfo={userInfo}/>
    </section>
}


