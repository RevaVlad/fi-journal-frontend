import '../components-styles/SearchBar.css'

export function SearchBar(props) {
    return <div className="search-bar-container">
        <input type="text" className="search-bar"/>
        <button className="search-btn">Найти</button>
    </div>
}
