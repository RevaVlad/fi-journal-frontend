import {useState} from "react";
import {createPatchUserFetcher} from "../../backendRequests/fetchers";
import shared from "../../styles/shared.module.css";
import styles from "../../styles/Profile.module.css";

export function PersonalData({userInfo}) {
    const [dataFields, setDataFields] = useState({
        email: userInfo.email,
    });
    const patchUserFunc = async () => {
        const [, status] = await createPatchUserFetcher(userInfo.id, dataFields.email, userInfo.password)



        if (status === 200)
            window.location.reload();
    }

    return <div>
        <span className={shared.importantLabel} style={{fontSize: "40px"}}>Мои данные</span>

        <div className={shared.whiteContainer} style={{display: "flex", flexDirection: "column", gap: "20px"}}>
            <div className={styles.inputsContainer}>
                <DisabledDataField label="Имя" value={userInfo.name} type="text"/>
                <DisabledDataField label="Фамилия" value={userInfo.surname} type="text"/>
                <DataField label="Электронная почта" value={dataFields["email"]} type="email" name="email" setDataFields={setDataFields}/>
            </div>
            <button className={styles.button} onClick={patchUserFunc}>Сохранить изменения</button>
        </div>
    </div>
}

function DataField({label, value, type, setDataFields, name}){
    return <div className={shared.verticalContainer} style={{gap: "8px"}}>
        <label className={shared.clarification}>{label}</label>
        <input name={name} type={type} value={value} className={styles.inputField}
               onChange={(e) => {
                   setDataFields(prev => {
                       const name = e.target.name
                       const newValue = {...prev}
                       newValue[name] = e.target.value
                       return newValue
                   })
               }}/>
    </div>
}

function DisabledDataField({label, type, value}){
    return <div className={shared.verticalContainer} style={{gap: "8px"}}>
        <label className={shared.clarification}>{label}</label>
        <input type={type} disabled={true} value={value} className={styles.inputField} style={{color: "#A0A0A0"}}/>
    </div>
}
