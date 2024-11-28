import {useState} from "react";
import {SearchBar} from "./SearchBar";
import shared from "../../styles/shared.module.css";
import Collapsible from "react-collapsible";
import {getSubjectColor} from "../../utils";
import styles from "../../styles/MainContent.module.css";
import {useMediaQuery} from "react-responsive";
import {Link} from "react-router-dom";
import ReactLoading from "react-loading";
import {useGroupInfo, useTableInfo, useTablePoints} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";

export function GroupsInfo({ userInfo }) {
    const [searchItem, setSearchItem] = useState("");

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }

    return <section className="main-content">
        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange}/>
        {userInfo.groupsIds.map(id =>
            <GroupInfo key={id} id={id} userId={userInfo.id} searchFilter={searchItem}/>
        )}
    </section>
}

function GroupInfo({id, userId, searchFilter}) {
    const [info, status, isLoading] = useGroupInfo(id)
    const [open, setOpen] = useState(true);
    const handleOpen = () => {setOpen(!open)}

    return <>
        {!isLoading && (status === 200) && <div>
            <span className={shared.importantLabel} style={{fontSize: "35px", margin: 0}}>
                {info.name}
                <button onClick={handleOpen}>{open ? "▼" : "▶"}
                </button>
            </span>
            <Collapsible trigger="" open={open}>
                {info.tableIds.map(
                    tableId => (<Table id = {tableId}
                                       key= {tableId}
                                       userId={userId}
                                       groupName={info.name}
                                       searchFilter={searchFilter}/>
                    ))}
            </Collapsible>
        </div>}
    </>
}

function Table({id, userId, groupName, searchFilter}) {
    const [info, status, isLoading] = useTableInfo(id)
    const isMobile = useMediaQuery({query: '(max-width: 500px)'})


    if (isLoading || (status !== 200))
        return <></>

    const isFiltered = !info.name.toLowerCase().includes(searchFilter.toLowerCase())

    const style = isFiltered ? {display: "none"} : {display: "flex"}

    let subjectColor = getSubjectColor(groupName, info.name)
    return <div className={styles.subject} style={style}>
        <TableInfo name={info.name} tableLink={info.link}/>
        {!isMobile &&
            <div className={styles.tableAndTableLabel}>
                <span className={shared.whiteContainer + " " + styles.tableLabel}>Ваши баллы:</span>
                <TablePoints table={info} color={subjectColor} userId={userId} key={info.id}/>
            </div>
        }
    </div>
}


function TableInfo(props){
    return <div className={shared.whiteContainer + " " + styles.subjectInfo}>
        <span className={shared.importantLabel} style={{fontSize: "35px"}}>{props.name}</span>
        <Link to={props.tableLink} className={shared.buttonDefault + " h-[41px] w-[201px] mt-auto mb-0"}
              target="_blank" rel="noopener noreferrer">
            Посмотреть
        </Link>
    </div>
}

function TablePoints({table, color, userId}) {
    const [points, status, isLoading] = useTablePoints(userId, table.id)

    if (isLoading) {
        return <Loading scale={.05}/>
    }

    if (status !== 200 || points.length < 1){
        return <PlaceHolder/>
    }

    return <div className={styles.tableDiv}>
        <table className={styles.table}>
            <thead>
                <tr className={styles.tr}>
                    {points.map(([column, ]) => {
                        return <th className={styles.th} key={column}>{column}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr className={styles.tr}>
                    {points.map(([, value]) => {
                        return <td className={styles.td} style={{backgroundColor: color}} key={value}>{value}</td>
                    })}
                </tr>
            </tbody>
        </table>
    </div>
}

function PlaceHolder(){
    return <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}>
        <ReactLoading type={"spin"} color={"#9c88ff"} height={'5%'} width={'5%'} />
    </div>
}
