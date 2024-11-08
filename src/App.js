import shared from './styles/shared.module.css';
import {Header} from "./components/Header";
import {RecentNotificationsContainer} from "./components/RecentNotification";
import {MainContent} from "./components/MainContent"

function App() {
    var data =
        {"name": "Владислав Рева",
         "email": "vladreva57@gmail.com",
         "groups": {
            "id-jfkldsajfls": {
                "groupName": "ФТ-202",
                "tables": {
                    "id-aaaaaaa": {
                        "name": "Матан",
                        "recentUpdates": [
                            [new Date("2024-11-07 19:22"), ["12.09", 1], ["14.09", 2]],
                            [new Date("2024-11-07 13:50"), ["13.09", 0.1]]
                        ]
                    },
                    "id-aaaaaab": {
                        "name": "Дискретка",
                        "recentUpdates": [
                            [new Date("2024-10-10 19:22"), ["15.10", 1], ["18.10", .5]],
                            [new Date("2024-09-12 19:21"), ["18.09", 0.1]],
                            [new Date("2023-11-07 19:20"), ["19.09", 0.1]],
                            [new Date("2024-09-12 19:19"), ["15.09", 0.1]]
                        ]
                    }
                }
            },
            "id-nbxnvx": {
                "groupName": "ФТ-202-2",
                "tables": {
                    "id-bbbbbb": {
                        "name": "Матан",
                        "recentUpdates": [
                            [new Date("2024-09-12 19:22"), [ "12.09", 1], ["14.09", 2]],
                            [new Date("2024-08-24 13:50"), ["13.09", 0.1]]
                        ]
                    },
                    "id-bbbbbbc": {
                        "name": "Дискретка",
                        "recentUpdates": [
                            [new Date("2024-09-12 19:22"), ["15.10", 1], ["18.10", .5]],
                            [new Date("2024-09-12 19:21"), ["18.09", 0.1]],
                            [new Date("2024-09-12 19:20"), ["19.09", 0.1]],
                            [new Date("2024-09-12 19:19"), ["15.09", 0.1]]
                        ]
                    }
                }
            }
         }}
    console.log(JSON.stringify(data))

    return (<main className="main">
        <Header/>
        <section className={shared.whiteContainer}>
            <RecentNotificationsContainer data={data}/>
        </section>
        <MainContent data={data}/>
    </main>);
}

export default App;
