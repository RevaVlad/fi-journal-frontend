import {useEffect, useState} from "react";
import {SearchBar} from "./SearchBar";
import shared from "../../styles/shared.module.css";
import Collapsible from "react-collapsible";
import {getSubjectColor} from "../../utils";
import styles from "../../styles/MainContent.module.css";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";

export function MainContent(props) {
    const [searchItem, setSearchItem] = useState("");
    const groups = props.userData.groups;

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }

    return <section className="main-content">
        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange}/>
        {groups.map((group) => (
            <GroupWithFilteredTables group={group} key={group.id} userId={props.userData.id} searchTerm={searchItem}/>
        ))}
    </section>
}

function GroupWithFilteredTables(props) {
    const [tables, _] = useState(props.group.tables);

    const filteredTables = (props.searchTerm.length > 0) ?
        tables.filter(table => table.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
        : tables
    return <Group group={props.group.withTables(filteredTables)} userId={props.userId}/>
}

function Group(props) {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {setOpen(!open)}

    const group = props.group
    const tables = props.group.tables

    return <div>
        <span className={shared.importantLabel + " text-[35px] m-0"}
              style={{color: tables.length > 0 ? "" : "#A0A0A0"}}>
            {group.name}
            <button onClick={handleOpen}>{open ? "▼" : "▶"}
            </button>
        </span>
        <Collapsible trigger="" open={open}>
            {tables.map(
                table => (<Table groupName={group.name}
                                   table={table}
                                   key={table.id}
                                   userId={props.userId}/>
                ))}
        </Collapsible>
    </div>
}

function Table(props) {
    let table = props.table
    let subjectColor = getSubjectColor(props.groupName, table.name)
    return <div className={styles.subject}>
        <TableInfo name={table.name} tableLink={table.link}/>
        {useMediaQuery({query: '(max-width: 500px)'}) ||
            <div className={styles.tableAndTableLabel} style={{}}>
                <span className={shared.whiteContainer + " " + styles.tableLabel}>Ваши баллы:</span>
                <Grades table={table} color={subjectColor} userId={props.userId} key={table.id}/>
            </div>
        }
    </div>
}

function TableInfo(props){
    return <div className={shared.whiteContainer + " " + styles.subjectInfo}>
        <span className={shared.importantLabel} style={{fontSize: "35px"}}>{props.name}</span>
        <Link to={props.tableLink} className={shared.buttonDefault + " h-[41px] w-[201px] mt-auto mb-0"}
              target="_blank" rel="noopener noreferrer">
            Посмотреть</Link>
    </div>
}

function Grades(props) {
    const table = props.table
    const [points, setPoints] = useState(table.points);
    useEffect(() => {
        const temp = async () => {
            if (!table.isInitialized){
                await table.initializeUserPoints(props.userId)
                setPoints(table.points)
            }
        }

        temp()
    })

    if (points.length === 0){
        return <PlaceHolder/>
    }

    return <div className={styles.tableDiv}>
        <table className={styles.table}>
            <thead>
                <tr className={styles.tr}>
                    {points.map(([column, value]) => {
                        return <th className={styles.th} key={column}>{column}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr className={styles.tr}>
                    {points.map(([column, value]) => {
                        return <td className={styles.td} style={{backgroundColor: props.color}} key={value}>{value}</td>
                    })}
                </tr>
            </tbody>
        </table>
    </div>
}

function PlaceHolder(){
    return <div className={shared.whiteContainer + " " + styles.tablePlaceHolder}>
        Здесь пока ничего нет, но очень скоро появится
    </div>
}