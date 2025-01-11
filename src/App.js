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
import {SetTitle} from "./components/utils.js";
import {PageNotFound} from "./components/PageNotFound/PageNotFound";
import {StartPage} from "./components/StartPage/StartPage";
import {ChangePassword} from "./components/UserProfile/ChangePassword";
import {ResetPassword} from "./components/Authentication/ResetPassword/ResetPassword";


function App() {
    let userToken = Cookies.get(UserTokenCookie);
    const [isAuthenticated, setIsAuthenticated] = useState(userToken);

    if (isAuthenticated) {
        return (
            <main className="main">
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <SetTitle title="Главная | φ.Журнал" />
                                <Student />
                            </>}/>
                        <Route path="/profile" element={
                            <>
                                <SetTitle title="Профиль | φ.Журнал" />
                                <UserProfile setToken={setIsAuthenticated} />
                            </>}/>
                        <Route path="/changePassword" element={
                            <>
                                <SetTitle title="Профиль | Смена пароля" />
                                <ChangePassword/>
                            </>}/>
                        <Route path="/join/:id" element={<><GroupRegisterLink /></>}/>
                        <Route path="/*" element={<><PageNotFound /></>}/>
                    </Routes>
                </BrowserRouter>
            </main>
        );
    }

    return (
        <main className="main">
            <NotAuthenticatedHeader />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <>
                            <SetTitle title="φ.Журнал" />
                            <StartPage />
                        </>}/>
                    <Route path="/signin" element={
                        <>
                            <SetTitle title="Вход | φ.Журнал" />
                            <SignIn setAuthenticated={setIsAuthenticated} />
                        </>}/>
                    <Route path="/signin/resetPassword" element={
                        <>
                            <SetTitle title="Восстановление пароля | φ.Журнал"/>
                            <ResetPassword/>
                        </>
                    }/>
                    <Route
                        path="/signup" element={
                        <>
                            <SetTitle title="Регистрация | φ.Журнал" />
                            <SignUp />
                        </>}/>
                    <Route path="/*" element={<Navigate to={"/signin"} />}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;