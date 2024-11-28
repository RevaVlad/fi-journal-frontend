import shared from "../../styles/shared.module.css";
import styles from "../../styles/Profile.module.css";
import {useGroupInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {createDeleteUserFromGroupFetcher} from "../../backendRequests/fetchers";

export function UserGroups({userInfo}) {
    return <>
        {// <AddGroupButton/>
        }
        <span className={shared.importantLabel} style={{fontSize: "40px"}}>Ваши группы</span>
        <div className={styles.groupsContainer}>
            {userInfo.groupsIds.map(groupId => <GroupCard groupId={groupId} userId={userInfo.id} key={groupId}/>)}
        </div>
    </>
}

function GroupCard({groupId, userId}) {
    const [group, status, isLoading] = useGroupInfo(groupId)

    if (isLoading || status !== 200)
        return <Loading scale={0.05}/>

    const leaveGroup = async () => {
        await createDeleteUserFromGroupFetcher(groupId, userId)
        window.location.reload();
    }

    return <div className={shared.whiteContainer + " " + styles.groupCard}>
        <span className={shared.importantLabel} style={{fontSize: "35px"}}>{group.name}</span>
        <button onClick={leaveGroup} className={styles.redButton}
                style={{height: "40px", width: "150px", marginTop: "auto", marginBottom: 0}}>
            Выйти
        </button>
    </div>
}
