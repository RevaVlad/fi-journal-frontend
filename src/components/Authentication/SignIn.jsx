import styles from '../../styles/Auth.module.css'
import shared from '../../styles/shared.module.css'
import {useState} from "react";
import {AuthenticationFields} from "./AuthenticationFields";
import {SignInButton} from "./SubmitButton";
import {Allerts} from "./Alerts";
import {Checkbox} from "primereact/checkbox";


const labels = {
    email: "Электронная почта",
    password: "Пароль"
}

export function SignIn({setAuthenticated}) {
    const [errors, setErrors] = useState([]);
    const [dataFields, setDataFields] = useState({
        email: "",
        password: "",
    })
    const [remember, setRemember] = useState(false)

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "10x"}}>
            <div className={shared.whiteContainer + " " + styles.signIn} style={{gap: "16px"}}>
                <AuthenticationFields dataFields={dataFields} setDataFields={setDataFields} labels={labels}/>
                <RememberMe remember={remember} setRemember={setRemember}/>
                <SignInButton dataFields={dataFields} setErrors={setErrors} setAuthenticated={setAuthenticated} remember={remember}/>
            </div>
            <Allerts alertMessages={errors}/>
        </div>
    </div>
}

function RememberMe({remember, setRemember}){
    return <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
        <Checkbox className={styles.checkbox} inputId="remember" checked={remember} onChange={() => setRemember(!remember)}/>
        <label htmlFor="remember">Запомнить меня</label>
    </div>
}