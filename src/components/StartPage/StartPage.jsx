import styles from "../../styles/StartPage.module.css";

export function StartPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.content}>
                <div className={styles.logoContainer}>
                    <img
                        src="logo.svg"
                        alt="Логотип"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.textContent}>
                    <h1 className={styles.title}>φ.Журнал</h1>
                    <p className={styles.description}>
                        Это сервис для быстрого и удобного контроля актуальных баллов по учебным дисциплинам,
                        разработанный специально для ФИИТ на матмехе УрФУ.
                    </p>
                    <p className={styles.notice}>
                        Мы предоставляем студентам баллы в системе оценки преподавателя, итоговые баллы БРС могут отличаться!
                    </p>
                </div>
            </div>
        </div>
    );
}