import {MainContent} from "./MainContent";
import {UserData} from "../../UserData";
import {useEffect, useState} from "react";

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
        return <></>
    }

    return <>
        {//<RecentNotificationsContainer userData={userData}/>}
        }
        <MainContent userData={userData}/>
    </>
}
