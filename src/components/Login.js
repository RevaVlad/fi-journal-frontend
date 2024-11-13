import shared from '../styles/shared.module.css'
import styles from '../styles/login.module.css'

export function Login() {
    return <main className={shared.centerOfScreen} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <form className={shared.whiteContainer + " " + shared.verticalContainer} style={{width: "377px",
                                                                                         height: "377px",
                                                                                         gap: "32px"}}>
            <div className={shared.verticalContainer} style={{gap: "16px", alignItems: "center"}}>
                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="email">Электронная почта</label>
                    <input className={styles.inputField} type="email" id="email"/>
                </div>

                <div className={shared.verticalContainer}>
                    <label className={styles.clarification} htmlFor="password">Пароль</label>
                    <input className={styles.inputField} type="password" id="password"/>
                </div>

            </div>

            <div className={shared.verticalContainer} style={{gap: "10px", alignItems: "center"}}>
                <button type="submit" className={shared.buttonDefault} style={{width: "200px", padding: "10px"}}>Войти
                </button>
                <p className={styles.clarification} style={{textDecoration: "underline", cursor: "pointer"}}>Регистрация</p>
            </div>
        </form>
    </main>
}