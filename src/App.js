import './components-styles/App.css';
import {Header} from "./components/Header";
import 'bootstrap/dist/css/bootstrap.css'
import {RecentNotificationsContainer} from "./components/RecentNotificationsContainer";
import {SubjectsInfo} from "./components/SubjectsInfo";

function App() {
    // const f = (item) => console.log(item);
    return (<main className="main">
        <Header/>
        <section className="latest">
            <h2>Последние</h2>
            <RecentNotificationsContainer></RecentNotificationsContainer>
        </section>
        <section className="main-contentn">
            <input type="text"/>
            <button className="search-btn">Найти</button>
            <SubjectsInfo></SubjectsInfo>
        </section>
    </main>);
}

export default App;
