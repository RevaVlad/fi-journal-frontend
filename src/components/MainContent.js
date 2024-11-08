import shared from "../styles/shared.module.css"
import styles from "../styles/MainContent.module.css"
import Collapsible from 'react-collapsible';
import {SearchBar} from "./SearchBar";
import {useState} from "react";
import {isMobile} from "react-device-detect";
import {getSubjectColor} from "../utils";
import "../backendRequests"
import {
    getGroupIdsOfUser,
    getGroupName,
    getTableName,
    getTableRecentUpdates,
    getTablesIdsOfGroup
} from "../backendRequests";


export function MainContent(props) {
    const [searchItem, setSearchItem] = useState("");

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }

    return <section className="main-content">
        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange}/>
        {getGroupIdsOfUser(props.username).map(id => (
            <Group name={getGroupName(id)}
                   tables={getTablesIdsOfGroup(id)}
                   key={id}/>
        ))}
    </section>
}

function Group(props) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => {setOpen(!open)}


    return <div>
        <span className={shared.importantLabel + " text-[35px] m-0"}>
            {props.name}
            <button onClick={handleOpen}>{open ? "▼" : "▶"}
            </button>
        </span>
        <Collapsible trigger="" open={open}>
            {props.tables
                .map(id => (
                    <Subject groupName={props.name}
                             name={getTableName(id)}
                             recentUpdates={getTableRecentUpdates(id)}
                             key={id}/>
            ))}
        </Collapsible>
    </div>
}

function Subject(props) {
    let lastUpdate = props.recentUpdates.length > 0 ? props.recentUpdates[0][0] : null
    let subjectColor = getSubjectColor(props.groupName, props.name)
    return <div className={styles.subject}>
        <SubjectInfo lastUpdate={lastUpdate} name={props.name}/>
        {isMobile || <Grades recentUpdates={props.recentUpdates} color={subjectColor}/>}
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
        <div className="mb-[20px]">
            <span className={shared.importantLabel + " text-[35px]"}>{props.name}</span>
            {(props.lastUpdate != null) ? <span className={shared.clarification}>Последнее обновление: {date}</span> : null}
        </div>
        <button className={shared.buttonDefault + " h-[41px] w-[201px] mt-auto mb-0"}>Посмотреть</button>
    </div>
}

function Grades(props) {
    let gradesData = []

    for (let i = 0; i < props.recentUpdates.length; i++) {
        let updateDate = props.recentUpdates[i][0]
        for (let j = 1; j < props.recentUpdates[i].length; j++) {
            gradesData.push([updateDate, props.recentUpdates[i][j][0], props.recentUpdates[i][j][1]])
        }
    }

    for (var updates in props.recentUpdates){
        let updateDate = updates[0]
        for (var update in updates.slice(1, updates.length - 1)) {
            gradesData.push([updateDate, update[0], update[1]])
        }
    }
    return <div className={shared.whiteContainer + " " + styles.gradesContainer}>
        {gradesData.map(gradeData => <Grade date={gradeData[0]} column={gradeData[1]} grade={gradeData[2]} color={props.color}/>)}
    </div>
}

function Grade(props) {
    let date = props.date.toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    });
    return <div className={styles.gradeCard}>
        <span className={shared.squareAround + " text-white"} style={{backgroundColor: props.color}}>{props.grade}</span>
        <div className={shared.clarification}>
            {props.column}
            <span className={shared.smallerClarification}>{date}</span>
        </div>
    </div>
}
