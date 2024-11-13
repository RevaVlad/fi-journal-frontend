import shared from '../styles/shared.module.css'
import {RecentNotificationsContainer} from "./RecentNotification";
import {MainContent} from "./MainContent"
import {UserData} from "../models";

export function Student(){
    var username = "Владислав Рева"
    var userData = new UserData(username)

    return <main className="main">
        <section className={shared.whiteContainer}>
            <RecentNotificationsContainer userData={userData}/>
        </section>
        <MainContent userData={userData}/>
    </main>
}
