import styles from "../../styles/Profile.module.css"
import shared from "../../styles/shared.module.css"


export function Profile(props){
    return <div className={shared.verticalContainer}>
        <ProfileHeader {...props}/>
        <PersonalData {...props}/>
        <UserGroups {...props}/>
    </div>
}

function ProfileHeader(props){
    return <div className={shared.whiteContainer + " " + shared.horizontalContainer}
                style={{justifyContent: "space-between", gap: "16px"}}>
        <span className={shared.importantLabel} style={{fontSize: "32px"}}>Факс Мурман</span>

        <div className={shared.horizontalContainer} style={{justifyContent: "right", gap: "10px"}}>
            <button className={styles.button}>Режим преподавателя</button>
            <button className={styles.button}>Сменить пароль</button>
            <button className={styles.button} style={{backgroundColor: "#F16868"}}>Выйти</button>
        </div>
    </div>
}

function PersonalData(props) {
    return <div>
        <span className={shared.importantLabel} style={{fontSize: "40px"}}>Мои данные</span>
        <div className={shared.whiteContainer + " " + styles.inputsContainer}>
            <DataField label="ФИО" value="" type="text"></DataField>
            <DataField label="Электронная почта" value="" type="email"></DataField>
            <DataField label="ЧЕ-ТО ЕЩЕ" value="" type="text"></DataField>
            <DataField label="ЧЕ-ТО ЕЩЕ" value="" type="text"></DataField>
        </div>
    </div>
}

function DataField(props){
    return <div className={shared.verticalContainer} style={{gap: "8px"}}>
        <span className={shared.clarification}>{props.label}</span>
        <input type={props.type} value={props.value} className={styles.inputField}/>
    </div>
}

function UserGroups(props) {
    return <>
        <GroupCard/>
        <GroupCard/>
        <GroupCard/>
        <AddGroupButton/>
    </>
}

function GroupCard(props){

}

function AddGroupButton(props){

}