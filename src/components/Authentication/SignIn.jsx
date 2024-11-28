import styles from '../../styles/Auth.module.css'
import shared from '../../styles/shared.module.css'
import {useState} from "react";
import {AuthenticationFields} from "./AuthenticationFields";
import {SignInButton} from "./SubmitButton";
import {Allerts} from "./Alerts";


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

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
            <div className={shared.whiteContainer + " " + styles.signIn}>
                <AuthenticationFields dataFields={dataFields} setDataFields={setDataFields} labels={labels}/>
                <SignInButton dataFields={dataFields} setErrors={setErrors} setAuthenticated={setAuthenticated} />
            </div>
            <Allerts alertMessages={errors}/>
        </div>
    </div>
}