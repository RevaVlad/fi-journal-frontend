import {useState} from "react";
import {createForgotPasswordMessage} from "../../../backendRequests/fetchers";
import {Button} from "primereact/button";
import shared from "../../../styles/shared.module.css";
import {AuthenticationFields} from "../AuthenticationFields";
import {Allerts} from "../Alerts";
import {validateEmail} from "../validators";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const labels = {
    email: "Электронная почта",
}

export function ResetPassword() {
    const [messages, setMessages] = useState([])
    const [errors, setErrors] = useState([])
    const [dataFields, setDataFields] = useState({
        email: "",
    })

    return <div className={shared.centerOfScreen} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10x"}}>
            <div className={shared.whiteContainer + " " + shared.verticalContainer} style={{gap: "16px"}}>
                <AuthenticationFields dataFields={dataFields} setDataFields={setDataFields} labels={labels}/>
                <SendEmailButton email={dataFields["email"]} setMessages={setMessages} setErrors={setErrors}/>
            </div>
            <Allerts errors={errors} messages={messages}/>
        </div>
    </div>
}

function SendEmailButton({email, setMessages, setErrors}) {
    const [disabled, setDisabled] = useState(false);

    const sendEmail = async () => {
        const emailError = validateEmail(email);

        if (emailError) setErrors([emailError])
        else{
            setDisabled(true);
            setErrors([]);
            setMessages(["Проверьте вашу почту"]);
            await createForgotPasswordMessage(email)
        }
    }

    return <Button className={shared.buttonDefault} style={{padding: "10px"}} disabled={disabled} onClick={sendEmail}>
        {disabled ?
            <FontAwesomeIcon icon={faCheck}/> :
            "Отправить письмо"
        }
    </Button>
}
