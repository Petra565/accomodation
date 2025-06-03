import { useState, useEffect } from 'react'
import CheckInFormComponent from '../CheckInFormComponents/CheckInFormComponent'
import { useParams } from 'react-router-dom'

//Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


//DatePicker
import DatePicker from 'react-datepicker';
import moment from 'moment';

function CheckInFormContainerComponent() {
    const [validated, setValidated] = useState(false);

    const [orderData, setOrderData] = useState([])
    const [numberOfGuests, setNumberOfGuests] = useState(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const [guestsData, setGuestsData] = useState([]);
    const [guestNote, setGuestNote] = useState('');

    useEffect(() => {
        if (orderData.numberOfGuests) {
            /* Array(n).fill({}) vytvorí pole s n prvkami, kde každý je rovnaký objekt { }.*/

            const newGuestsDataClear = Array(orderData.numberOfGuests).fill(null).map(() => ({}));
            setGuestsData(newGuestsDataClear);
        }
    }, [orderData.numberOfGuests]);

    useEffect(() => {
        if (id) {
            loadOrderData(id);
        }
    }, [id]);

    const loadOrderData = (orderId) => {
        const url = `http://localhost:4000/order/get/${orderId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setOrderData(data)
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }
    if (loading) return <p>Načítavam...</p>;
    if (error) return <p>Chyba: {error.message}</p>;


    const handleChangeGuestData = (guest, i) => {
        let guestsDataCopy = [...guestsData]
        guestsDataCopy[i] = guest;
        setGuestsData(guestsDataCopy)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            let dataFromCheckIn = {
                guestsData: guestsData,
                guestNote: guestNote,
                _id: id
            }
            fetch(`http://localhost:4000/checkIn/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataFromCheckIn),
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.error('Error:', error);
            })
        }
        setValidated(true);
       
    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <div className="text-start">
                    <h1>Check-in</h1>
                    {guestsData.map((guest, index) => (
                        <CheckInFormComponent
                            key={index}
                            index={index}
                            sendNewGuestData={(data) => handleChangeGuestData(data, index)}
                        />
                    ))}
                    <div className="border rounded p-4 mt-2" >
                        <Row className="mb-1">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Dátum príchodu</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    name="arrivalDate"
                                    value={orderData.arrivalDate ? moment(orderData.arrivalDate).format('DD.MM.YYYY') : ''}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Dátum odchodu</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                    name="departureDate"
                                    value={orderData.departureDate ? moment(orderData.departureDate).format('DD.MM.YYYY') : ''}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4" >
                                <Form.Label>Počet nocí</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="1"
                                    min="0"
                                    disabled
                                    name="numberOfNights"
                                    value={orderData.numberOfNights}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-1" >
                            <Form.Group as={Col}>
                                <Form.Label>Špeciálne požiadavky</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="guestsNote"
                                    rows={3}
                                    onChange={(e) => setGuestNote(e.target.value)}
                                    value={guestNote}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-1">
                            <Form.Group as={Col}>
                                <Form.Check // prettier-ignore
                                    type='checkbox'
                                    id="default-checkbox"
                                    label='Súhlasím so spracovaním osobných údajov'
                                    required
                                />
                            </Form.Group>
                        </Row>
                    </div>
                    <Row className="my-4">
                        <Form.Group as={Col}>
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                            >
                                Odoslať
                            </Button>
                        </Form.Group>
                    </Row>
                </div>
            </Form>
        </>
    );
}
export default CheckInFormContainerComponent