import {useEffect} from "react";
import {createAddUserToGroupFetcher} from "../../backendRequests/fetchers";
import {useUserInfo} from "../../backendRequests/fetchHooks";
import {useNavigate} from "react-router-dom";

export function GroupRegisterLink () {
    const currentUrl = window.location.pathname
    const path = currentUrl.split('/')
    const [userInfo, userInfoStatus, loading] = useUserInfo()
    const navigate = useNavigate();

    useEffect(() => {
        const temp = async () => {
            if (path.length !== 3 || path[1] !== "join") {
                return <>404</>
            }

            const possibleGroupId = path[2]

            if (userInfoStatus === 200){
                const [, status] = await createAddUserToGroupFetcher(userInfo.id, possibleGroupId)
                if (status === 200)
                    navigate("/")
                else
                    navigate("/kjjfdslkajfdksanf")
            }
        }

        temp()
    }, [currentUrl, loading])
}