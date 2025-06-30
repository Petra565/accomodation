import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import OrderTableComponent from './Components/OrderTable/OrderTableComponent.jsx'
import CalendarComponent from './Components/Calendar/CalendarComponent.jsx'
import ChartsComponent from './Components/Chart/ChartsComponent.jsx';
import CheckInFormContainerComponent from './Components/CheckInForm/CheckInFormContainerComponent.jsx';
import LoginComponent from './Components/Common/LoginComponent';


function App() {

    return (
        <div className="container-md container rounded">
            <Router>

                <Routes>
                    <Route
                        path="/"
                        element={<LoginComponent />}
                    />
                    <Route
                        path="/orders"
                        element={<OrderTableComponent />}
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
                        path="/CheckIn/:id"
                        element={<CheckInFormContainerComponent />}
                    />
                   
                </Routes>
            </Router>
        </div>
    )
}

export default App
