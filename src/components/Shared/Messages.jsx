import shared from "../../styles/shared.module.css";

export function NoGroupsMessage() {
    return <div className={shared.whiteContainer} style={{display: "flex", flexDirection: "column", margin: 0, height: "100%", alignContent: "center", gap: "20px"}}>
        <div className={shared.importantLabel} style={{fontSize: "35px"}}>
            Добро пожаловать!
        </div>
        <div style={{fontSize: "25px", textWrap: "pretty", fontWeight: 400}}>
            Чтобы приступить к использованию φ.Журнала, вступите в группу, созданную преподавателем с помощью ссылки-приглашения
            {//  или создайте группу самостоятельно
            }
        </div>
    </div>
}

export function NoGroupsInProfileMessage() {
    return <div className={shared.whiteContainer} style={{display: "flex", flexDirection: "column", margin: 0, height: "100%", width: "100%", alignContent: "center", gap: "20px"}}>
        <div style={{fontSize: "25px", textWrap: "pretty", fontWeight: 400}}>
            Данные о Ваших группах не найдены
        </div>
    </div>
}

export function FailedToLoadUserDataMessage() {
    return <div className={shared.whiteContainer} style={{display: "flex", flexDirection: "column", margin: 0, height: "100%", alignContent: "center", gap: "20px"}}>
        <div className={shared.importantLabel} style={{fontSize: "35px"}}>
            Возникла ошибка
        </div>
        <div style={{fontSize: "25px", textWrap: "pretty", fontWeight: 400}}>
            Данные о пользователе не найдены
            {//  или создайте группу самостоятельно
            }
        </div>
    </div>
}

export function NoTablePointsMessage() {
    return <div className={shared.whiteContainer} style={{margin: 0, height: "100%", alignContent: "center"}}>
        <div className={shared.clarification} style={{fontSize: "20px", textWrap: "pretty"}}>
            Здесь пока ничего нет, но очень скоро появится
        </div>
    </div>
}