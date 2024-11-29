import {Header, NotAuthenticatedHeader} from "./components/Shared/Header";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Student} from "./components/StudentView/Student";
import {UserProfile} from "./components/UserProfile/UserProfile";
import {UserTokenCookie} from "./configuration";
import Cookies from "js-cookie";
import {useState} from "react";
import {SignIn} from "./components/Authentication/SignIn";
import {SignUp} from "./components/Authentication/SignUp";
import {GroupRegisterLink} from "./components/GroupRegisterLink/GroupRegisterLink";


function App() {
    let userToken = Cookies.get(UserTokenCookie)
    const [isAuthenticated, setIsAuthenticated] = useState(userToken);

    if (isAuthenticated) {
        return <main className="main">
            <Header/>
            <BrowserRouter future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
                <Routes>
                    <Route path="/" element={<Student/>}/>
                    <Route path="/profile" element={<UserProfile setToken={setIsAuthenticated}/>} />
                    <Route path="/*" element={<GroupRegisterLink/>} />
                </Routes>
            </BrowserRouter>
        </main>
    }

    return <main className="main">
        <NotAuthenticatedHeader/>
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}>
            <Routes>
                <Route path="/signin" element={<SignIn setAuthenticated={setIsAuthenticated}/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/*" element={<Navigate to={"/signin"}/>} />
            </Routes>
        </BrowserRouter>
    </main>
}

export default App;