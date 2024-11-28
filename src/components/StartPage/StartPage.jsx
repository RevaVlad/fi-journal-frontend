import styles from "../../styles/StartPage.module.css"

export function StartPage(props){
    return <div>
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="../../../public/logo.svg" alt="Логотип" className="logo"/>
            </div>
            <div className={styles.info}>
                <h1>φ.Журнал</h1>
                <p>
                    Это сервис для быстрого и удобного контроля актуальных баллов по учебным дисциплинам,
                    разработанный специально для ФИИТ на матмехе УрФУ.
                </p>
                <p>
                    Мы предоставляем студентам баллы в системе оценки преподавателя, итоговые баллы БРС могут
                    отличаться!
                </p>
            </div>
        </div>
    </div>
}