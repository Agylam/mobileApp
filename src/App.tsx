import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main/Main.tsx";
import React from "react";
import "./App.scss"
import {Schedule} from "./pages/Schedule/Schedule.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/schedule" element={<Schedule/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
