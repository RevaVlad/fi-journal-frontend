import React from "react";
import styles from "../../styles/PageNotFound.module.css";

export const PageNotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorMessage}>Страница не найдена</p>
        </div>
    );
};