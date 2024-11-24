import shared from '../styles/shared.module.css'
import styles from '../styles/Header.module.css'
import React, {useState} from "react";
import Cookies from "js-cookie";
import {UserTokenCookie} from "./configuration";
import {Link} from "react-router-dom";

export function Header(props) {
    const logout = () => Cookies.set(UserTokenCookie, "")
    const [open, setOpen] = useState(false);

    return <div className={styles.header}>
        <div className={styles.companyName}>φ.Журнал</div>
        <div className={styles.navigation}>
            <button className={styles.burgerButton} onClick={() => setOpen(!open)}>☰</button>
            <div className={styles.navLinks} style={{display: open ? 'flex' : 'none'}}>
                <div className={shared.buttonDefault + " " + styles.button}><a href="/home">Оценки</a></div>
                <div className={shared.buttonDefault + " " + styles.button}><a href="/profile">Профиль</a></div>
                <a className={styles.redButton} href={"/login"} onClick={logout}>Выйти</a>
            </div>
        </div>
    </div>
}
