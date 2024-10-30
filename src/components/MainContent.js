import '../components-styles/RecentNotifications.module.css'
import {SearchBar} from "./SearchBar";
import {SubjectsInfo} from "./SubjectsInfo";

export function MainContent(props) {
    return <section className="main-contentn">
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
}
