import shared from "../../styles/shared.module.css"
import {GroupsInfo} from "./GroupsInfo";
import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {EmailIsNotVerifiedMessage, FailedToLoadUserDataMessage, NoGroupsMessage} from "../Shared/Messages";
import {RecentNotificationsContainer} from "./RecentNotification";
import {useEffect, useRef, useState} from "react";
import {createVerificationMessage} from "../../backendRequests/fetchers";
import {useCountdown} from "../utils";
import {verbose} from "../../configuration";
import {Button} from "primereact/button";

export function Student(){
    const [userInfo, status, isLoading] = useUserInfo()
    const tableRefs = useRef({})
    const tablesAreLoaded = useRef(false)

    if (isLoading){
        return <div className={shared.centerOfScreen} style={{width: "100%", height: "100%"}}><Loading scale={0.05}/></div>
    }
    if (status !== 200){
        return <div style={{marginTop: "20px"}}>
            <FailedToLoadUserDataMessage/>
        </div>
    }

    if (!userInfo.isEmailVerified){
        return <div style={{marginTop: "40px"}}>
            <EmailIsNotVerifiedMessage/>
            <SendEmailVerification userId={userInfo.id}/>
        </div>
    }

    if (status !== 200 || userInfo.groupsIds.length < 1){
        return <div style={{marginTop: "40px"}}>
            <NoGroupsMessage/>
        </div>
    }

    return <>
        <RecentNotificationsContainer userInfo={userInfo} tableRefs={tableRefs} tablesAreLoaded={tablesAreLoaded}/>
        <GroupsInfo tableRefs={tableRefs} userInfo={userInfo} onLoad={() => {
            tablesAreLoaded.current = true
        }}/>
    </>
}

function SendEmailVerification({userId}){
    const timeout = 60
    if (localStorage.getItem("emailTimeRemaining") == null)
        localStorage.setItem("emailTimeRemaining", timeout);

    const [isFinished, timeRemaining, setTimeRemaining] = useCountdown(+localStorage.getItem("emailTimeRemaining"));

    localStorage.setItem("emailTimeRemaining", timeRemaining)
    const sendMessage = async () => {
        if (isFinished){
            setTimeRemaining(timeout)
            localStorage.setItem("emailTimeRemaining", timeout)
            await createVerificationMessage(userId)
        }
    }

    if (isFinished){
        return <button style={{padding: "10px", marginTop: "20px"}} className={shared.buttonDefault} onClick={sendMessage}>Отправить сообщение</button>
    }
    return <Button style={{padding: "10px", marginTop: "20px", }} className={shared.buttonDefault} disabled={true}>
        Отправить ещё раз через {timeRemaining} секунд
    </Button>
}
