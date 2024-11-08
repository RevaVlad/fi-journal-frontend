import shared from './styles/shared.module.css';
import {Header} from "./components/Header";
import {RecentNotificationsContainer} from "./components/RecentNotification";
import {MainContent} from "./components/MainContent"

function App() {
    return (<main className="main">
        <Header/>
        <section className={shared.whiteContainer}>
            <RecentNotificationsContainer username={"Владислав Рева"}/>
        </section>
        <MainContent username={"Владислав Рева"}/>
    </main>);
}

export default App;
