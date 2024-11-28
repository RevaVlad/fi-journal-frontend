import shared from '../../styles/shared.module.css'
import {useState} from "react";
import {AuthenticationFields} from "./AuthenticationFields";
import {SignUpButton} from "./SubmitButton";
import {Allerts} from "./Alerts";
import styles from "../../styles/Auth.module.css";


const labels = {
    name: "Имя",
    surname: "Фамилия",
    email: "Почта",
    password: "Пароль",
}

export function SignUp() {
    const [errors, setErrors] = useState([]);
    const [dataFields, setDataFields] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    })

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
            <div className={shared.whiteContainer + " " + styles.signUp}>
                <AuthenticationFields dataFields={dataFields} setDataFields={setDataFields} labels={labels}/>
                <SignUpButton dataFields={dataFields} setErrors={setErrors} />
            </div>
            <Allerts alertMessages={errors}/>
        </div>
    </div>
}