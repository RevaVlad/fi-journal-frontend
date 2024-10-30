import shared from './components-styles/shared.module.css';
import {Header} from "./components/Header";
import {RecentNotificationsContainer} from "./components/RecentNotificationsContainer";
import {MainContent} from "./components/MainContent";

function App() {
    return (<main className="main">
        <Header/>
        <section className={shared.whiteContainer}>
            <RecentNotificationsContainer></RecentNotificationsContainer>
        </section>
        <MainContent/>
    </main>);
}

export default App;
