import {MainContent} from "./MainContent";
import {UserData} from "../../UserData";
import {useEffect, useState} from "react";
import ReactLoading from 'react-loading';
import shared from "../../styles/shared.module.css"

export function Student(){
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const temp = async () => {
            if (!userData){
                const data = await UserData.fromToken()
                await data.initializeGroupsInfo()
                for (const group of data.groups)
                    await group.initializeTablesInfo()
                setUserData(data)
            }
        }

        temp()
    })

    if (!userData){
        return <div className={shared.centerOfScreen} style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ReactLoading type={"spin"} color={"#9c88ff"} height={'5%'} width={'5%'} />
        </div>
    }

    return <>
        {//<RecentNotificationsContainer userData={userData}/>}
        }
        <MainContent userData={userData}/>
    </>
}
