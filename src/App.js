import {Header} from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./components/Login";
import {Student} from "./components/Student";


function App() {
    return <>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Student />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default App;
