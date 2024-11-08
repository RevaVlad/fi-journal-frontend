import shared from "../styles/shared.module.css"
import styles from "../styles/MainContent.module.css"
import Collapsible from 'react-collapsible';
import {SearchBar} from "./SearchBar";
import {useState} from "react";
import {isMobile} from "react-device-detect";

const subjectColors = [
    "#FE25A7",
    "#B586FA",
    "#8680F8",
    "#FBB4FE"
]


export function MainContent(props) {
    return <section className="main-content">
        <SearchBar data={props.data}/>
        {Object.keys(props.data["groups"]).map((id) => (props.data["groups"][id])).map((groupData, index) => (
            <Group name={groupData["groupName"]} tables={groupData["tables"]} key={index}/>
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
            {Object
                .keys(props.tables)
                .map((id) => props.tables[id])
                .map((tableData, index) => (
                    <Subject name={tableData["name"]} recentUpdates={tableData["recentUpdates"]} key={index}/>
            ))}
        </Collapsible>
    </div>
}

function Subject(props) {
    let lastUpdate = props.recentUpdates[0][0]
    return <div className={styles.subject}>
        <SubjectInfo lastUpdate={lastUpdate} name={props.name}/>
        {isMobile || <Grades recentUpdates={props.recentUpdates} color={randomChoice(subjectColors)}/>}
    </div>
}

function SubjectInfo(props){
    let date = props.lastUpdate.toLocaleString('ru', {
        day: 'numeric',
        month: 'long'
    });
    return <div className={shared.whiteContainer + " " + styles.subjectInfo}>
        <div className="mb-[20px]">
            <span className={shared.importantLabel + " text-[35px]"}>{props.name}</span>
            <span className={shared.clarification}>Последнее обновление: {date}</span>
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

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}
