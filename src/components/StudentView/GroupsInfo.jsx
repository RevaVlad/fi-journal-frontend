import {useEffect, useState} from "react";
import {SearchBar} from "./SearchBar";
import shared from "../../styles/shared.module.css";
import Collapsible from "react-collapsible";
import {getSubjectColor} from "../../utils";
import styles from "../../styles/MainContent.module.css";
import {Link} from "react-router-dom";
import {useGroupInfo, useTableInfo, useTablePoints} from "../../backendRequests/fetchHooks";
import {Loading} from "../Shared/Loading";
import {NoTablePointsMessage} from "../Shared/Messages";
import {BrowserView, MobileView} from "react-device-detect";

export function GroupsInfo({ userInfo, tableRefs, onLoad }) {
    const [searchItem, setSearchItem] = useState("");

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)
    }

    let loadedGroups = 0
    const incrementLoadedGroups = () => {
        loadedGroups += 1
        if (loadedGroups === userInfo.groupsIds.length){
            onLoad()
        }
    }

    return <section className="main-content">
        <SearchBar searchItem={searchItem} handleInputChange={handleInputChange}/>
        {userInfo.groupsIds.map(id =>
            <GroupInfo tableRefs={tableRefs} key={id} id={id} userId={userInfo.id} searchFilter={searchItem} onLoad={incrementLoadedGroups}/>
        )}
    </section>
}

function GroupInfo({id, userId, searchFilter, tableRefs, onLoad}) {
    const [info, status, isLoading] = useGroupInfo(id)
    const [open, setOpen] = useState(true);
    const handleOpen = () => {setOpen(!open)}

    let loadedTables = 0
    const incrementLoadedTables = () => {
        loadedTables += 1
        if (!isLoading && (status === 200) && loadedTables === info.tableIds.length){
            onLoad()
        }
    }

    return <>
        {!isLoading && (status === 200) && <div>
            <span className={shared.importantLabel} style={{fontSize: "35px", margin: 0}}>
                {info.name}
                <button onClick={handleOpen}>{open ? "▼" : "▶"}
                </button>
            </span>
            <Collapsible trigger="" open={open}>
                {info.tableIds.map(
                    tableId => (
                        <>
                            <MobileView>
                                <TableMobile id = {tableId}
                                           tableRefs={tableRefs}
                                           key={tableId}
                                           userId={userId}
                                           groupName={info.name}
                                           searchFilter={searchFilter}
                                           onLoad={incrementLoadedTables}/>
                            </MobileView>
                            <BrowserView>
                                <Table id={tableId}
                                         tableRefs={tableRefs}
                                         key= {tableId}
                                         userId={userId}
                                         groupName={info.name}
                                         searchFilter={searchFilter}
                                         onLoad={incrementLoadedTables}/>
                            </BrowserView>
                        </>
                    ))}
            </Collapsible>
        </div>}
    </>
}

function TableMobile({id, userId, groupName, searchFilter, tableRefs, onLoad}){
    const [info, status, isLoading] = useTableInfo(id, userId)

    if (isLoading || (status !== 200))
        return <></>

    const isFiltered = !info.name.toLowerCase().includes(searchFilter.toLowerCase())

    const style = isFiltered ? {display: "none"} : {display: "flex", flexDirection: "column"}

    let subjectColor = getSubjectColor(info.id)
    return <div className={styles.subject} style={style}>
        <TableInfoMobile name={info.name} tableLink={info.link}/>
        {
            <div className={styles.tableAndTableLabel}>
                <TablePoints table={info} color={subjectColor} userId={userId} key={info.id} tableRefs={tableRefs} onLoad={onLoad}/>
            </div>
        }
    </div>
}

function Table({id, userId, groupName, searchFilter, tableRefs, onLoad}) {
    const [info, status, isLoading] = useTableInfo(id, userId)


    if (isLoading || (status !== 200))
        return <></>

    const isFiltered = !info.name.toLowerCase().includes(searchFilter.toLowerCase())
    const style = isFiltered ? {display: "none"} : {display: "flex", flexDirection: "row"}

    let subjectColor = getSubjectColor(info.id)
    return <div className={styles.subject} style={style}>
        <TableInfo  name={info.name} tableLink={info.link}/>
        {
            <div className={styles.tableAndTableLabel}>
                <span className={shared.whiteContainer + " " + styles.tableLabel}>Ваши баллы:</span>
                <TablePoints table={info} color={subjectColor} userId={userId} tableRefs={tableRefs} onLoad={onLoad}/>
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

function TableInfoMobile({name, tableLink}) {
    return <div className={styles.subjectInfo} style={{flexDirection: "row", height: "initial", justifyContent: "space-between", gap: "8px"}}>
        <div className={shared.importantLabel + " " + styles.mobileSubjectLabel} style={{fontSize: "35px"}}>{name}</div>
        <Link to={tableLink} className={shared.buttonDefault + " h-[52.5px] w-[201px]"}
              target="_blank" rel="noopener noreferrer">
            Посмотреть
        </Link>
    </div>
}

function TablePoints({table, color, userId, tableRefs, onLoad}) {
    const [points, status, isLoading] = useTablePoints(userId, table.id)

    useEffect(() => {
        if (!isLoading){
            onLoad()
        }
    }, [isLoading]);

    if (isLoading) {
        return <Loading scale={.05}/>
    }

    if (status !== 200 || points.length < 1){
        return <NoTablePointsMessage/>
    }

    return <div className={styles.tableDiv}>
        <table className={styles.table} ref={(ref) => {
            const copy = {...tableRefs.current}
            copy[table.id] = ref
            tableRefs.current = copy
        }}>
            <thead>
                <tr className={styles.tr}>
                    {points.map(([column, ]) => {
                        return <th className={styles.th} key={column}>{column}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                <tr className={styles.tr}>
                    {points.map(([column, value]) => {
                        return <td className={styles.td} style={{backgroundColor: color}} key={column + "" + value}>{value}</td>
                    })}
                </tr>
            </tbody>
        </table>
    </div>
}
