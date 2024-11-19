import shared from '../styles/shared.module.css'
import styles from '../styles/login.module.css'
import Cookies from "js-cookie"
import {getUserId} from "../backendRequests";
import {UserIDCookie} from "./configuration";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <div className={shared.centerOfScreen} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div className={shared.whiteContainer + " " + shared.verticalContainer} style={{width: "377px",
                                                                                         height: "377px",
                                                                                         gap: "32px"}}>
            <div className={shared.verticalContainer} style={{gap: "16px", alignItems: "center"}}>
                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="email">Электронная почта</label>
                    <input className={styles.inputField} type="email" id="email"
                           value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="password">Пароль</label>
                    <input className={styles.inputField} type="password" id="password"
                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

            </div>

            <div className={shared.verticalContainer} style={{gap: "10px", alignItems: "center"}}>
                <p className={styles.clarification} style={{textDecoration: "underline", cursor: "pointer"}}>Регистрация</p>
                <LoginButton username={username} password={password} setAuthenticated={props.setAuthenticated}/>
            </div>
        </div>
    </div>
}

function LoginButton(props) {
    const navigate = useNavigate();

    const verifyUser = () => {
        let userId = getUserId(props.username, props.password)
        if (!userId) {
            // change state to make label visible
        } else {
            Cookies.set(UserIDCookie, userId, {expires: 1})
            console.log("redirect?")
            props.setAuthenticated(true)
            navigate("/home", { replace: true })
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={verifyUser}>
        Войти
    </button>
}
