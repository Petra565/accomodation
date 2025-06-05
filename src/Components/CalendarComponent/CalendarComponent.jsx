import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import NavBarComponent from '../MainTableComponents/NavBarComponent.jsx';
import { orderList } from '../Services/OrderServices.js';


//Calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sk'

moment.locale('sk')
const localizer = momentLocalizer(moment)

function CalendarComponent() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrdersData();
    }, []);

    const loadOrdersData = () => {
        orderList()
            .then((data) => {
                setData(data.orders);
                setLoading(false);

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }
    const getState = (order) => {
        if (!order) return;
        const now = new Date();
        const arrivalDate = new Date(order.arrivalDate);
        const departureDate = new Date(order.departureDate);

        if (arrivalDate > now) return 'upcoming';
        else if (arrivalDate <= now && now <= departureDate) return 'active';
        else return 'done';
    }

    const events = data.map((order) => ({
        state: getState(order),
        title: (order.firstName + ' ' + order.lastName),
        start: new Date(order.arrivalDate),
        end: new Date(order.departureDate),
        allDay: true
    }))

    const eventStyleGetter = (event) => {
        let backgroundColor = '#3174ad'

        if (event.state === 'upcoming') {
            backgroundColor = '#0d6efd'
        } else if (event.state === 'active') {
            backgroundColor = '#198754'
        } else if (event.state === 'done') {
            backgroundColor = '#ffc107'
        }

        const style = {
            backgroundColor,
            color: 'white',
            borderRadius: '5px',
            padding: '2px 5px',
            opacity: 0.9,
            border: '0px',
        }

        return { style }
    }

    return (
        <>
            <NavBarComponent />

            <div style={{ height: 600 }}>

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    culture="sk"
                    eventPropGetter={eventStyleGetter}
                    messages={{
                        today: 'Dnes',
                        previous: 'Predchádzajúci',
                        next: 'Ďalší',
                        month: 'Mesiac',
                        week: 'Týždeň',
                        day: 'Deň',
                        agenda: 'Agenda',
                        date: 'Dátum',
                        time: 'Čas',
                        event: 'Udalosť',
                        noEventsInRange: 'Žiadne udalosti v tomto rozsahu.',
                    }}
                />
            </div>
        </>
    );
}

export default CalendarComponent