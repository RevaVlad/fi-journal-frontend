import './components-styles/App.css';
import {Header} from "./components/Header";
import 'bootstrap/dist/css/bootstrap.css'
import {RecentNotificationsContainer} from "./components/RecentNotificationsContainer";
import {SubjectsInfo} from "./components/SubjectsInfo";
import {SearchBar} from "./components/SearchBar";

function App() {
    return (<main className="main">
        <Header/>
        <section className="latest">
            <RecentNotificationsContainer></RecentNotificationsContainer>
        </section>
        <section className="main-contentn">
            <SearchBar></SearchBar>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
            <SubjectsInfo></SubjectsInfo>
        </section>
    </main>);
}

export default App;
