import shared from "../../styles/shared.module.css";
import styles from "../../styles/Auth.module.css";
import {Password} from "primereact/password";

export function AuthenticationFields ({dataFields, setDataFields, labels}) {
    return <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        {Object.entries(dataFields).map(([name, value]) => {
            return name.toLowerCase().includes("password") ?
                <PasswordInputField name={name} value={value} label={labels[name]} setDataFields={setDataFields} key={name}/> :
                <InputField name={name} value={value} label={labels[name]} setDataFields={setDataFields} key={name}/>
        })}
    </div>
}

function InputField ({name, value, label, setDataFields}) {
    return <div className={shared.verticalContainer}>
        <label className={styles.clarification} htmlFor={name}>{label}</label>
        <input className={styles.inputField} type="text" id={name}
               value={value} onChange={(e) => {
            setDataFields(prev => {
                const name = e.target.id
                const newValue = {...prev}
                newValue[name] = e.target.value
                return newValue
            })
        }}/>
    </div>
}

function PasswordInputField({name, value, label, setDataFields}) {
    return <div className={shared.verticalContainer}>
        <label className={styles.clarification} htmlFor={name}>{label}</label>
        <Password toggleMask feedback={false} type="password" inputId={name}
                  value={value} onChange={(e) => {
                setDataFields(prev => {
                const name = e.target.id
                const newValue = {...prev}
                newValue[name] = e.target.value
                return newValue
        })}}/>
    </div>
}