import { useState, useEffect } from 'react'
import CheckInFormComponent from '../CheckInFormComponents/CheckInFormComponent'
import { useParams } from 'react-router-dom'
import { checkInGet } from '../Services/CheckInServices'
import { checkInCreate } from '../Services/CheckInServices'

//Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import moment from 'moment';

function CheckInFormContainerComponent() {
    const [validated, setValidated] = useState(false);

    const [orderData, setOrderData] = useState([])
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
        checkInGet(orderId)
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
            checkInCreate(dataFromCheckIn)
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.error('Error:', error);
                })
        }
        setValidated(true);

    }

    return (
        <>
            {orderData.checkInData?.state === 'finishedByHost' &&
                < Badge className="mt-3 mx-2 fs-6 px-3 py-2" bg='success'>Vyplnené hostiteľom</Badge >
            }
            {orderData.checkInData?.state === 'finishedByGuest' &&
                < Badge className="mt-3 mx-2 fs-6 px-3 py-2" bg='success'>Vyplnené hosťom</Badge >
            }


            {orderData.checkInData?.state === 'notFinished' &&


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
                        <div className="border rounded p-4 mt-2 bg-white" >
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
                            <Row className="mt-2">
                                <Form.Group as={Col}>
                                    <Form.Check
                                        type='checkbox'
                                        id="default-checkbox"
                                        label='Súhlasím so spracovaním osobných údajov'
                                        required
                                    />
                                </Form.Group>
                            </Row>
                        </div>
                        <Row className="my-4 pb-4">
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
            }
        </>
    );
}
export default CheckInFormContainerComponent