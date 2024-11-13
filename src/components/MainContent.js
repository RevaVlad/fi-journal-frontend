import shared from "../styles/shared.module.css"
import styles from "../styles/MainContent.module.css"
import Collapsible from 'react-collapsible';
import {SearchBar} from "./SearchBar";
import {useState} from "react";
import {getSubjectColor} from "../utils";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";

export function MainContent(props) {
    const [searchItem, setSearchItem] = useState("");
    const [groups, setGroups] = useState(props.userData.groups)

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        if (searchTerm !== "") {
            setGroups(props.userData.groups.map(group =>
                group.withTables(group.tables.filter(table =>
                    table.name.toLowerCase().includes(searchTerm.toLowerCase())))))
        }
        else{
            setGroups(props.userData.groups)
        }
    }


    return <section className="main-content">
        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange}/>
        {groups.map((group) => (<Group group={group} key={group.id}/>))}
    </section>
}

function Group(props) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => {setOpen(!open)}
    let group = props.group

    return <div>
        <span className={shared.importantLabel + " text-[35px] m-0"}>
            {group.name}
            <button onClick={handleOpen}>{open ? "▼" : "▶"}
            </button>
        </span>
        <Collapsible trigger="" open={open}>
            {group.tables.map(
                table => (<Subject groupName={group.name}
                                          table={table}
                                          key={table.id}/>
            ))}
        </Collapsible>
    </div>
}

function Subject(props) {
    let table = props.table
    let lastUpdate = table.recentUpdates.length > 0 ? table.recentUpdates[0][0] : null
    let subjectColor = getSubjectColor(props.groupName, table.name)
    return <div className={styles.subject}>
        <SubjectInfo lastUpdate={lastUpdate} name={table.name} tableLink={table.link}/>
        {useMediaQuery({query: '(max-width: 500px)'}) || <Grades table={table} color={subjectColor}/>}
    </div>
}

function SubjectInfo(props){
    let date;
    if (props.lastUpdate != null){
        date = props.lastUpdate.toLocaleString('ru', {
            day: 'numeric',
            month: 'long'
        });
    }

    return <div className={shared.whiteContainer + " " + styles.subjectInfo}>
        <div style={{marginBottom: "20px"}}>
            <span className={shared.importantLabel} style={{fontSize: "35px"}}>{props.name}</span>
            {(props.lastUpdate != null) ? <span className={shared.clarification}>Последнее обновление: {date}</span> : null}
        </div>
        {/*<button className={shared.buttonDefault + " h-[41px] w-[201px] mt-auto mb-0"}>Посмотреть</button>*/}
        <Link to={props.tableLink} className={shared.buttonDefault + " h-[41px] w-[201px] mt-auto mb-0"}>Посмотреть</Link>
    </div>
}

function Grades(props) {
    return <div className={shared.whiteContainer + " " + styles.gradesContainer}>
        {props.table.recentUpdates.map(updateInfo => <Grade updateInfo={updateInfo} color={props.color}/>)}
    </div>
}

function Grade(props) {
    let update = props.updateInfo
    let date = update.date.toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });

    return <div className={styles.gradeCard}>
        <span className={shared.squareAround + " text-white"} style={{backgroundColor: props.color}}>{update.grade}</span>
        <div className={shared.clarification}>
            {update.column}
            <span className={shared.smallerClarification}>{date}</span>
        </div>
    </div>
}
