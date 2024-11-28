import styles from "../../styles/Profile.module.css"
import shared from "../../styles/shared.module.css"
import {useEffect, useState} from "react";
import {UserData} from "../../UserData";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Cookies from "js-cookie"
import {UserTokenCookie} from "../configuration";
import {deleteUserFromGroup, patchUser} from "../../fetcherTemplates";
import ReactLoading from "react-loading";


export function Profile(){
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const temp = async () => {
            if (!userData){
                const data = await UserData.fromToken()
                await data.initializeGroupsInfo()
                setUserData(data)
            }
        }

        temp()
    })

    if (!userData)
        return <div className={shared.centerOfScreen} style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ReactLoading type={"spin"} color={"#9c88ff"} height={'5%'} width={'5%'} />
        </div>

    return <ProfileMainContent userData={userData}/>
}

function ProfileMainContent(props){
    const profileVariables = new ProfileVariables(
        props.userData.name,
        props.userData.surname,
        useState(props.userData.email));

    return <section style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <ProfileHeader userData={props.userData}/>
        <PersonalData profileVariables={profileVariables} userId={props.userData.id}/>
        <UserGroups userData={props.userData}/>
    </section>
}

class ProfileVariables
{
    name;
    surname;
    email;
    setEmail;

    constructor(name, surname, [email, setEmail]){
        this.name = name;
        this.surname = surname;
        [this.email, this.setEmail] = [email, setEmail];
    }
}


function ProfileHeader(props) {
    const isMobile = useMediaQuery({ query: `(width <= 560px)` });
    const logout = () => Cookies.set(UserTokenCookie, "")


    // <button className={styles.button}>Режим преподавателя</button>
    return <div className={shared.whiteContainer + " " + (isMobile ? shared.verticalContainer : shared.horizontalContainer)}
                style={{justifyContent: "space-between", gap: "16px"}}>
        <span className={shared.importantLabel} style={{fontSize: "32px"}}>
            {props.userData.name} {props.userData.surname}
        </span>

        <div className={shared.horizontalContainer + " " + styles.headerButtonsContainer}>
            {//<button className={styles.button}>Сменить пароль</button>
            }
            <Link className={styles.redButton} to={"/signin"} onClick={logout}>Выйти</Link>
        </div>
    </div>
}

function PersonalData(props) {
    const profileVariables = props.profileVariables;

    const patchUserFunc = async () => {
        await patchUser(props.userId, profileVariables.email, profileVariables.password)
    }

    console.log(profileVariables)
    return <div>
        <span className={shared.importantLabel} style={{fontSize: "40px"}}>Мои данные</span>

        <div className={shared.whiteContainer} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <div className={styles.inputsContainer}>
                <DisabledDataField label="Имя" value={profileVariables.name} type="text"/>
                <DisabledDataField label="Фамилия" value={profileVariables.surname} type="text"/>
                <DataField label="Электронная почта" value={profileVariables.email} type="email" setLabel={profileVariables.setEmail}/>
            </div>
            <button className={styles.button} onClick={patchUserFunc}>Сохранить изменения</button>
        </div>
    </div>
}

function DataField(props){
    return <div className={shared.verticalContainer} style={{gap: "8px"}}>
        <label className={shared.clarification}>{props.label}</label>
        <input type={props.type} value={props.value} className={styles.inputField}
               onChange={(e) => props.setLabel(e.target.value)}/>
    </div>
}

function DisabledDataField(props){
    return <div className={shared.verticalContainer} style={{gap: "8px"}}>
        <label className={shared.clarification}>{props.label}</label>
        <input type={props.type} disabled={true} value={props.value} className={styles.inputField} style={{color: "#A0A0A0"}}/>
    </div>
}

function UserGroups(props) {
    // <AddGroupButton/>
    return <>
        <span className={shared.importantLabel} style={{fontSize: "40px"}}>Ваши группы</span>
        <div className={styles.groupsContainer}>
            {props.userData.groups.map((group, i) => <GroupCard group={group} userId={props.userData.id} key={i}/>)}
        </div>
    </>
}

function GroupCard(props) {
    const group = props.group;
    const leaveGroup = async () => {
        await deleteUserFromGroup(group.id, props.userId)
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

// function AddGroupButton(props){
//
// }