import styles from "../../styles/Auth.module.css";

export function Allerts({alertMessages}) {
    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px"}}>
        {alertMessages.map((errorText, i) => <RedAlert errorText={errorText} key={i}/>)}
    </div>
}

function RedAlert(props) {
    return <div className={styles.redAlert}>
        {props.errorText}
    </div>
}

