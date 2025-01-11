import styles from "../../styles/Auth.module.css";

export function Allerts({messages, errors}) {
    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        {messages.map((message, i) => <BlueAlert text={message} key={i}/>)}
        {errors.map((errorText, i) => <RedAlert text={errorText} key={i + messages.length}/>)}
    </div>
}

function RedAlert({text}) {
    return <div className={styles.redAlert}>
        {text}
    </div>
}

function BlueAlert({text}) {
    return <div className={styles.redAlert} style={{backgroundColor: "#9c88ff"}}>
        {text}
    </div>
}
