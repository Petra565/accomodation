import { useState } from 'react'
import './App.css'
import MainTableComponent from './Components/MainTableComponents/MainTableComponent.jsx'
import CalendarComponent from './Components/CalendarComponent/CalendarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarComponent from './Components/MainTableComponents/NavBarComponent.jsx';
import ChartComponent from './Components/ChartComponents/ChartComponent.jsx';
function AdminPage() {
    return <h2>Admin sekcia</h2>;
}
function App() {
    const [count, setCount] = useState(0)
    const [calendarData, setCalendarData] = useState([])

    const ReceiveCalendarData = (receiveData) => {
        setCalendarData(receiveData)
    }

    return (
        <>
            <Router>
                <NavBarComponent />

                <Routes>
                    <Route
                        path="/"
                        element={<MainTableComponent sendCalendarData={ReceiveCalendarData} />}
                    />
                    <Route
                        path="/calendar"
                        element={<CalendarComponent data={calendarData} />}
                    />
                    <Route
                        path="/statistics"
                        element={<ChartComponent data={calendarData} />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
