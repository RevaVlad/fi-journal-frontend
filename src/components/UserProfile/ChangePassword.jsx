import styles from "../../styles/Auth.module.css"
import shared from "../../styles/shared.module.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthenticationFields} from "../Authentication/AuthenticationFields";
import {Allerts} from "../Authentication/Alerts";
import {useUserInfo} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {FailedToLoadUserDataMessage} from "../Shared/Messages";
import {createPatchUserFetcher} from "../../backendRequests/fetchers";


const labels = {
    newPassword: "Новый пароль",
    newPasswordConfirm: "Повторите новый пароль"
}

export function ChangePassword() {
    const [userInfo, status, isLoading] = useUserInfo()
    const [errors, setErrors] = useState([]);
    const [dataFields, setDataFields] = useState({
        newPassword: "",
        newPasswordConfirm: "",
    })

    if (isLoading)
        return <div className={shared.centerOfScreen} style={{width: "100%", height: "100%"}}><Loading scale={0.05}/></div>

    if (status !== 200)
        return <div style={{marginTop: "20px"}}>
            <FailedToLoadUserDataMessage/>
        </div>

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
            <div className={shared.whiteContainer + " " + styles.signIn}>
                <AuthenticationFields dataFields={dataFields} setDataFields={setDataFields} labels={labels}/>
                <Submit setAlerts={setErrors} userId={userInfo.id} dataFields={dataFields}/>
            </div>
            <Allerts errors={errors} messages={[]}/>
        </div>
    </div>
}

function Submit({setAlerts, userId, dataFields}){
    const navigate = useNavigate();

    const buttonAction = async () => {
        if (dataFields.newPassword !== dataFields.newPasswordConfirm) {
            setAlerts(["Пароли не совпадают"])
        }
        else if (dataFields.newPassword.length < 6){
            setAlerts(["Пароль должен содержать не меньше 6 символов"])
        }
        else {
            await createPatchUserFetcher(userId, "", dataFields.newPassword)
            navigate("/profile")
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={buttonAction}>
        Сохранить
    </button>
}