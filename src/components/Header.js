import shared from '../styles/shared.module.css'
import styles from '../styles/Header.module.css'
import React, {useState} from "react";
import Cookies from "js-cookie";
import {UserTokenCookie} from "./configuration";

export function Header(props) {
    return <div className={styles.header}>
        <OrganizationName/>
        <NavigationButton/>
    </div>
}

export function NotAuthenticatedHeader() {
    return <div className={styles.header}>
        <OrganizationName/>
        <Authentication/>
    </div>
}

function OrganizationName() {
    return <a className={styles.companyName} href={"/"}>φ.Журнал</a>
}

function Authentication() {
    return <div style={{display: "flex", flexDirection: "row", gap: "16px", marginRight: "30px"}}>
        <div><a href="/signin" className={shared.buttonDefault + " " + styles.button} style={{width: "100px"}}>Войти</a></div>
        <div style={{display: "flex", alignItems: "center"}}><a href="/signup" style={{textDecoration: "underline", color: "#ffffff"}}>Зарегистрироваться</a></div>
    </div>
}

function NavigationButton() {
    const logout = () => Cookies.set(UserTokenCookie, "")
    const [open, setOpen] = useState(false);
    return <div className={styles.navigation}>
        <button className={styles.burgerButton} onClick={() => setOpen(!open)}>☰</button>
        <div className={styles.navLinks} style={{display: open ? 'flex' : 'none'}}>
            <a href="/" className={shared.buttonDefault + " " + styles.button}>
                Оценки
            </a>
            <a href="/profile" className={shared.buttonDefault + " " + styles.button}>
                Профиль
            </a>
            <a className={styles.redButton} href={"/signin"} onClick={logout}>Выйти</a>
        </div>
    </div>
}
