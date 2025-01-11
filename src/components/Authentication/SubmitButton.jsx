import shared from "../../styles/shared.module.css";
import {useNavigate} from "react-router-dom";
import {createSignInFetcher, createUserCreationFetcher} from "../../backendRequests/fetchers";
import Cookies from "js-cookie";
import {UserTokenCookie, verbose} from "../../configuration";
import {validateEmail, validateName, validatePassword} from "./validators";

export function SignInButton({dataFields, setAuthenticated, setErrors, remember}) {
    const navigate = useNavigate()

    const verifyUser = async () => {
        console.log(dataFields['email'], dataFields['password'])
        let [userToken, statusCode] = await createSignInFetcher(
            dataFields['email'],
            dataFields['password'],
            remember)

        console.log(userToken, statusCode)
        if (statusCode === 200) {
            if (remember)
                Cookies.set(UserTokenCookie, userToken, {expires: 30})
            else
                Cookies.set(UserTokenCookie, userToken, {expires: 0.5})
            setAuthenticated(true)
            navigate("/", {replace: true})
        }
        else {
            setErrors(["Неверный email или пароль"])
        }
    }

    return <SubmitButton label={"Войти"} buttonAction={verifyUser}/>
}

export function SignUpButton({dataFields, setErrors}) {
    const navigate = useNavigate()

    const createUserOnClick = async () => {
        const newErrors = []
        const fullname = validateName(dataFields['name'], dataFields['surname'])
        if (fullname) {newErrors.push(fullname)}
        if (verbose) console.log(dataFields['email'])
        const email = validateEmail(dataFields['email'])
        if (email) {newErrors.push(email)}
        const password = validatePassword(dataFields['password'])
        if (password) {newErrors.push(password)}

        if (newErrors.length > 0){
            setErrors(newErrors)
            if (verbose) console.log(newErrors)
            return
        }

        const [userId, code] = await createUserCreationFetcher(
            dataFields['name'],
            dataFields['surname'],
            dataFields['email'],
            dataFields['password'])

        if (userId){
            navigate("/signin", {replace: true})
        }
        else if (code === 500) {
            setErrors(["Этот email уже занят"])
        }
        else {
            setErrors(["Не удалось зарегистрировать пользователя"])
        }
    }

    return <SubmitButton label={"Зарегистрироваться"} buttonAction={createUserOnClick}/>
}

export function SubmitButton({label, buttonAction}) {
    return <button className={shared.buttonDefault} style={{width: "200px", padding: "10px"}} onClick={buttonAction}>
        {label}
    </button>
}
