import {Header} from "./components/Header";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Login} from "./components/Login";
import {Student} from "./components/StudentView/Student";
import {Profile} from "./components/Profile/Profile";
import {UserIDCookie} from "./components/configuration";
import Cookies from "js-cookie";
import {useState} from "react";


function App() {
    let userId = Cookies.get(UserIDCookie)
    const [isAuthenticated, setIsAuthenticated] = useState(userId);

    return <main className="main">
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div/>} />
                <Route path="/login" element={<Login setAuthenticated={setIsAuthenticated} />} />
                <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Student userId={userId}/>
                </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile userId={userId}/>
                </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    </main>
}

const ProtectedRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default App;