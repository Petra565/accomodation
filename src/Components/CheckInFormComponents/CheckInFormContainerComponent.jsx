import { useState, useEffect } from 'react'
import CheckInFormComponent from '../CheckInFormComponents/CheckInFormComponent'

//Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


//DatePicker
import DatePicker from 'react-datepicker';
import moment from 'moment';

function CheckInFormContainerComponent({data}) {
    const [guestsData, setGuestsData] = useState([])
    const [numberOfGuests, setNumberOfGuests] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(data)
        //loadOrdersData();
    }, [data]);

    //const loadOrdersData = (filterPayload = {}) => {
    //    const queryParams = new URLSearchParams(filterPayload).toString();
    //    const url = `http://localhost:4000/order/list?${queryParams}`;

    //    fetch(url, {
    //        method: 'GET',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //    })
    //        .then((response) => {
    //            if (!response.ok) {
    //                throw new Error('Network response was not OK');
    //            }
    //            return response.json();
    //        })
    //        .then((data) => {
    //            setData(data.orders);
    //            setLoading(false);
    //            console.log(data)
    //        })
    //        .catch((error) => {
    //            setError(error);
    //            setLoading(false);
    //        });
    //}

    return (
        <>
            <CheckInFormComponent></CheckInFormComponent>
        </>
    );
}
export default CheckInFormContainerComponent