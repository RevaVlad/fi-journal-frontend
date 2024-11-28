import shared from '../styles/shared.module.css'
import styles from '../styles/auth.module.css'
import { Password } from 'primereact/password';
import Cookies from "js-cookie"
import {UserTokenCookie} from "./configuration";
import {login, createUserFetcher} from "../fetcherTemplates";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";


export function Auth(props) {
    const [errors, setErrors] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
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
                <Link to={props.islogin ? "/signup" : "/signin"}
                      className={styles.clarification}
                      style={{textDecoration: "underline", cursor: "pointer"}}>
                    { props.islogin ? "Регистрация" : "Вход" }
                </Link>

                {
                    props.islogin
                        ? <LoginButton email={email}
                                       password={password}
                                       setErrors={setErrors}
                                       setAuthenticated={props.setAuthenticated}/>
                        : <SignInButton name={name}
                                        surname={surname}
                                        email={email}
                                        password={password}
                                        setErrors={setErrors}
                                        setAuthenticated={props.setAuthenticated}/>
                }
            </div>
        </div>
        <Allerts errors={errors} setErrors={setErrors}/>
    </div>
}

function Allerts(props) {
    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        {props.errors.map((errorText, i) => <RedAlert errorText={errorText} key={i}/>)}
    </div>
}

function RedAlert(props) {
    return <div className={styles.redAlert}>
        {props.errorText}
    </div>
}

function validateName(name, surname){
    if (name.length + surname.length <= 3)
        return "Слишком короткое имя"
    return ""
}

function validateEmail(email){
    if (email.startsWith("@")) {
        return "Некорректный адрес электронной почты"
    }
    if (!email.endsWith("@gmail.com")) {
        return "Разрешается использовать только gmail.com"
    }
    return ""
}

function validatePassword(password){
    if (password.length < 6) {
        return "Пароль должен содержать не меньше 6 символов"
    }
    return ""
}

function LoginButton(props) {
    const navigate = useNavigate();

    const verifyUser = async () => {
        let [userToken, code] = await login(props.email, props.password)
        console.log(userToken, "usertoken")
        if (code === 200) {
            Cookies.set(UserTokenCookie, userToken, {expires: 1})
            console.log(`redirect -> /.  ${userToken}`)
            props.setAuthenticated(true)
            navigate("/", {replace: true})
        }
        else {
            props.setErrors(["Неверный email или пароль"])
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={verifyUser}>
        Войти
    </button>
}

function SignInButton(props) {
    const navigate = useNavigate();

    const createUserOnClick = async () => {
        const [userId, code] = await createUserFetcher(props.name, props.surname, props.email, props.password)

        let newErrors = []

        if (validateName(props.name, props.surname)) {newErrors.push(validateName(props.name, props.surname))}
        if (validateEmail(props.email)) {newErrors.push(validateEmail(props.email))}
        if (validatePassword(props.password)) {newErrors.push(validatePassword(props.password))}

        if (newErrors.length > 0){
            props.setErrors(newErrors)
            return
        }

        if (userId){
            console.log("redirect -> login")
            navigate("/signin", {replace: true})
        }
        else if (code === 500) {
            props.setErrors(["Этот email уже занят"])
        }
        else {
            props.setErrors(["Не удалось зарегистрировать пользователя"])
        }
    }

    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={createUserOnClick}>
        Зарегистрироваться
    </button>
}