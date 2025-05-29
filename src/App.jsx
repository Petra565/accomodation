import { useState } from 'react'
import './App.css'
import MainTableComponent from './Components/MainTableComponents/MainTableComponent.jsx'
import CalendarComponent from './Components/MainTableComponents/CalendarComponent/CalendarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBarComponent from './Components/MainTableComponents/NavBarComponent.jsx';


function StatisticsPage() {
    return <h2>Štatistiky</h2>;
}

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
                    <Route path="/" element={<MainTableComponent
                        sendCalendarData={ReceiveCalendarData} />} />
                    <Route path="/calendar" element={<CalendarComponent
                        data={calendarData}
                    />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
