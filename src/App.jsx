import { useState } from 'react'
import './App.css'
import MainTableComponent from './Components/MainTableComponents/MainTableComponent.jsx'
import CalendarComponent from './Components/CalendarComponent/CalendarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChartComponent from './Components/ChartComponents/ChartComponent.jsx';
import CheckInFormContainerComponent from './Components/CheckInFormComponents/CheckInFormContainerComponent.jsx';
function AdminPage() {
    return <h2>Admin sekcia</h2>;
}
function App() {

    return (
        <>
            <Router>

                <Routes>
                    <Route
                        path="/"
                        element={<MainTableComponent/>}
                    />
                    <Route
                        path="/calendar"
                        element={<CalendarComponent />}
                    />
                    <Route
                        path="/statistics"
                        element={<ChartComponent />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                    <Route
                        path="/CheckIn/:id"
                        element={<CheckInFormContainerComponent/>}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
