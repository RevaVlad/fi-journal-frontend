import '../components-styles/RecentNotification.css'

export function MainContent(props) {
    return <div className="card">
        <span className="date">Сегодня</span>
        <span className="value">0.1</span>
        <div className="subject">
            <span className="label">Мат. Анализ</span>
        </div>
    </div>
}
