import {Header, NotAuthenticatedHeader} from "./components/Header";
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {Auth} from "./components/Auth";
import {Student} from "./components/StudentView/Student";
import {Profile} from "./components/Profile/Profile";
import {UserTokenCookie} from "./components/configuration";
import Cookies from "js-cookie";
import {useState} from "react";
import {GroupAuthLink} from "./components/GroupAuthLink";
// import {StartPage} from "./components/StartPage";


function App() {
    let userToken = Cookies.get(UserTokenCookie)
    const [isAuthenticated, setIsAuthenticated] = useState(userToken);

    if (isAuthenticated) {
        return <main className="main">
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Student/>
                    </ProtectedRoute>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/*" element={<GroupAuthLink/>} />
                </Routes>
            </BrowserRouter>
        </main>
    }

    return <main className="main">
        <NotAuthenticatedHeader/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Student/>
                </ProtectedRoute>}/>
                <Route path="/signin" element={<Auth setAuthenticated={setIsAuthenticated} islogin={true}/>} />
                <Route path="/signup" element={<Auth setAuthenticated={setIsAuthenticated} islogin={false}/>} />
            </Routes>
        </BrowserRouter>
    </main>
}


const ProtectedRoute = ({ children, isAuthenticated }) => {
    return isAuthenticated ? children : <Navigate to="/signin"/>;
};

export default App;