import shared from '../styles/shared.module.css'
import styles from '../styles/SearchBar.module.css'

export function SearchBar(props) {
    return <div className={shared.whiteContainer + " flex whitespace-nowrap gap-4 flex-row overflow-hidden h-[80px]"}>
        <input
            type="text"
            className={styles.searchBar}
            onChange={props.handleInputChange}
        />
        <button className={shared.buttonDefault + " w-[104px]"}>Найти</button>
    </div>
}