import shared from '../components-styles/shared.module.css'
import styles from '../components-styles/SearchBar.module.css'

export function SearchBar(props) {
    return <div className={shared.whiteContainer + " flex whitespace-nowrap gap-4 flex-row overflow-hidden"}>
        <input type="text" className={styles.searchBar}/>
        <button className={styles.searchBtn}>Найти</button>
    </div>
}
