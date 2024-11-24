import {Header} from "./components/Header";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Auth} from "./components/Auth";
import {Student} from "./components/StudentView/Student";
import {Profile} from "./components/Profile/Profile";
import {UserTokenCookie} from "./components/configuration";
import Cookies from "js-cookie";
import {useState} from "react";
import {StartPage} from "./components/StartPage";


function App() {
    let userToken = Cookies.get(UserTokenCookie)
    const [isAuthenticated, setIsAuthenticated] = useState(userToken);

    return <main className="main">
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Student/>
                </ProtectedRoute>}/>
                <Route path="/login" element={<Auth setAuthenticated={setIsAuthenticated} islogin={true}/>} />
                <Route path="/signin" element={<Auth setAuthenticated={setIsAuthenticated} islogin={false}/>} />
                <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Student/>
                </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile/>
                </ProtectedRoute>}/>
            </Routes>
        </BrowserRouter>
    </main>
}

const ProtectedRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

export default App;