import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main/Main.tsx";
import React from "react";
import {Schedule} from "./pages/Schedule/Schedule.tsx";
import {MainContainer} from "./components/MainContainer/MainContainer.tsx";

function App() {
    return (
        <MainContainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/schedule" element={<Schedule/>}/>
                </Routes>
            </BrowserRouter>
        </MainContainer>
    )
}

export default App
