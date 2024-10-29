export function SubjectsInfo(props) {
    return <section className="main-content">
        <div className="content-item">
            <h3>Матан</h3>
            <p>Последнее обновление: сегодня</p>
            <button className="view-btn">Посмотреть</button>
            <div className="grades">
                <div className="grade">
                    <span className="number">19</span>
                    <span className="label">Мат. Анализ</span>
                </div>
                <div className="grade">
                    <span className="number">0.1</span>
                    <span className="label">Теория</span>
                </div>
                <div className="grade">
                    <span className="number">7</span>
                    <span className="label">ДМ</span>
                </div>
                <div className="grade">
                    <span className="number">3</span>
                    <span className="label">ИТИС</span>
                </div>
            </div>
        </div>
    </section>
}
