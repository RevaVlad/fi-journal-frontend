import shared from "../../styles/shared.module.css";
import {useNavigate} from "react-router-dom";
import {createSignInFetcher, createUserCreationFetcher} from "../../backendRequests/fetchers";
import Cookies from "js-cookie";
import {UserTokenCookie, verbose} from "../../configuration";
import {validateEmail, validateName, validatePassword} from "./validators";
import {useEffect} from "react";

export function SignInButton({dataFields, setAuthenticated, setErrors, remember}) {
    const navigate = useNavigate()

    const verifyUser = async () => {
        const email = dataFields['email'].trim()
        const password = dataFields['password']

        if (verbose) console.log(email, password)
        let [userToken, statusCode] = await createSignInFetcher(email, password, remember)

        if (verbose) console.log(userToken, statusCode)
        if (statusCode === 200) {
            if (remember)
                Cookies.set(UserTokenCookie, userToken, {expires: 30})
            else
                Cookies.set(UserTokenCookie, userToken, {expires: 0.5})
            setAuthenticated(true)
            navigate("/", {replace: true})
        } else {
            setErrors(["Неверный email или пароль"])
        }
    }

    return <SubmitButton label={"Войти"} buttonAction={verifyUser}/>
}

export function SignUpButton({dataFields, setErrors}) {
    const navigate = useNavigate()

    const createUserOnClick = async () => {
        const name = dataFields['name'].trim()
        const surname = dataFields['surname'].trim()
        const email = dataFields['email'].trim()
        const password = dataFields['password']

        const newErrors = []
        const nameError = validateName(name, surname)
        if (nameError) {
            newErrors.push(nameError)
        }
        const emailError = validateEmail(email)
        if (emailError) {
            newErrors.push(emailError)
        }
        const passwordError = validatePassword(password)
        if (passwordError) {
            newErrors.push(passwordError)
        }

        if (newErrors.length > 0) {
            setErrors(newErrors)
            if (verbose) console.log(newErrors)
            return
        }

        const [userId, code] = await createUserCreationFetcher(name, surname, email, password)

        if (userId) {
            navigate("/signin", {replace: true})
        } else if (code === 500) {
            setErrors(["Этот email уже занят"])
        } else {
            setErrors(["Не удалось зарегистрировать пользователя"])
        }
    }

    return <SubmitButton label={"Зарегистрироваться"} buttonAction={createUserOnClick}/>
}

export function SubmitButton({label, buttonAction}) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                buttonAction();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [buttonAction]);

    return (
        <button
            className={shared.buttonDefault}
            style={{width: "200px", padding: "10px"}}
            onClick={buttonAction}
        >
            {label}
        </button>
    );
}
