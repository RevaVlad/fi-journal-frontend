import {useMediaQuery} from "react-responsive";
import Cookies from "js-cookie";
import {UserTokenCookie} from "../../configuration";
import shared from "../../styles/shared.module.css";
import styles from "../../styles/Profile.module.css";
import {Link} from "react-router-dom";

export function ProfileHeader(props) {
    const isMobile = useMediaQuery({ query: `(width <= 560px)` });
    const logout = () => Cookies.set(UserTokenCookie, "")


    // <button className={styles.button}>Режим преподавателя</button>
    return <div className={shared.whiteContainer + " " + (isMobile ? shared.verticalContainer : shared.horizontalContainer)}
                style={{justifyContent: "space-between", gap: "16px"}}>
        <span className={shared.importantLabel} style={{fontSize: "32px"}}>
            {props.userInfo.name} {props.userInfo.surname}
        </span>

        <div className={shared.horizontalContainer + " " + styles.headerButtonsContainer}>
            {//<button className={styles.button}>Сменить пароль</button>
            }
            <Link className={styles.redButton} to={"/signin"} onClick={logout}>Выйти</Link>
        </div>
    </div>
}
