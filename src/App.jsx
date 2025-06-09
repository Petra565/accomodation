import './App.css'
import MainTableComponent from './Components/MainTableComponents/MainTableComponent.jsx'
import CalendarComponent from './Components/CalendarComponent/CalendarComponent.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChartsComponent from './Components/ChartComponents/ChartsComponent.jsx';
import CheckInFormContainerComponent from './Components/CheckInFormComponents/CheckInFormContainerComponent.jsx';
import LoginComponent from './Components/MainTableComponents/LoginComponent';

function AdminPage() {
    return <h2>Admin sekcia</h2>;
}
function App() {

    return (
        <div className="container container-md">
            <Router>

                <Routes>
                    <Route
                        path="/login"
                        element={<LoginComponent />}
                    />
                    <Route
                        path="/orders"
                        element={<MainTableComponent />}
                    />
                    <Route
                        path="/calendar"
                        element={<CalendarComponent />}
                    />
                    <Route
                        path="/statistics"
                        element={<ChartsComponent />}
                    />
                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                    <Route
                        path="/CheckIn/:id"
                        element={<CheckInFormContainerComponent />}
                    />
                   
                </Routes>
            </Router>
        </div>
    )
}

export default App
