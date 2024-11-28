import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {addUserToGroup} from "../fetcherTemplates";
import {UserData} from "../UserData";

export function GroupAuthLink(props) {
    const [userId, setUserId] = useState(null);
    
    const path = window.location.pathname
    const pathParts = path.split("/")
    const groupId = pathParts[pathParts.length - 1];
    
    useEffect(() => {

        if (pathParts.length > 2) {
            // 404 error
            return
        }

        const getUserId = async () => {
            const data = await UserData.fromToken()
            return data.id
        }

        setUserId(getUserId())
    }, [pathParts.length]);

    if (userId)
        return <RequestMaker userId={userId} groupId={groupId}/>

    return <></>
}

function RequestMaker(props) {
    const navigate = useNavigate();
    useEffect(() => {
        addUserToGroup(props.userId, props.groupId)
        // navigate('/', {replace: true})
    }, [navigate, props.groupId, props.userId]);
    return <></>
}