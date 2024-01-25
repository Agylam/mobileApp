import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./pages/Main/Main.tsx";
import React from "react";
import "./App.scss"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>]
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
