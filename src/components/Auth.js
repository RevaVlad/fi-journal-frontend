import shared from '../styles/shared.module.css'
import styles from '../styles/auth.module.css'
import { Password } from 'primereact/password';
import Cookies from "js-cookie"
import {UserTokenCookie} from "./configuration";
import {login, createUser} from "../backendRequests";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


export function Auth(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    return <div className={shared.centerOfScreen} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div className={shared.whiteContainer + " " + shared.verticalContainer} style={{width: "377px",
                                                                                         height: props.islogin ? "377px" : "550px",
                                                                                         gap: "32px"}}>
            <div className={shared.verticalContainer} style={{gap: "16px", alignItems: "center"}}>
                {
                    !props.islogin && <div className={shared.verticalContainer}>
                        <label className={styles.clarification} htmlFor="name">Имя</label>
                        <input className={styles.inputField} type="text" id="name"
                               value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                }

                {
                    !props.islogin && <div className={shared.verticalContainer}>
                        <label className={styles.clarification} htmlFor="surname">Фамилия</label>
                        <input className={styles.inputField} type="text" id="surname"
                               value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    </div>
                }

                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="email">Электронная почта</label>
                    <input className={styles.inputField} type="email" id="email"
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="password">Пароль</label>
                    <Password toggleMask feedback={false}  type="password" inputId="password"
                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            <div className={shared.verticalContainer} style={{gap: "10px", alignItems: "center"}}>
                <Link to={props.islogin ? "/signin" : "/login"}
                      className={styles.clarification}
                      style={{textDecoration: "underline", cursor: "pointer"}}>
                    { props.islogin ? "Регистрация" : "Вход" }
                </Link>

                {
                    props.islogin
                        ? <LoginButton email={email} password={password} setAuthenticated={props.setAuthenticated}/>
                        : <SignInButton name={name} surname={surname} email={email} password={password}
                                        setAuthenticated={props.setAuthenticated}/>
                }
            </div>
        </div>
    </div>
}

function LoginButton(props) {
    const navigate = useNavigate();

    const verifyUser = async () => {
        let userToken = await login(props.email, props.password)
        if (userToken) {
            Cookies.set(UserTokenCookie, userToken, {expires: 1})
            console.log(`redirect -> home.  ${userToken}`)
            props.setAuthenticated(true)
            navigate("/home", {replace: true})
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={verifyUser}>
        Войти
    </button>
}

function SignInButton(props) {
    const navigate = useNavigate();

    const createUserOnClick = async () => {
        const userId = await createUser(props.name, props.surname, props.email, props.password)
        console.log(userId)
        if (userId){
            console.log("redirect -> login")
            navigate("/login", {replace: true})
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={createUserOnClick}>
        Зарегистрироваться
    </button>
}