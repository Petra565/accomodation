import { useState, useEffect } from 'react'

//Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

//DatePicker
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

//Enums
import LanguageEnum from '../../Enums/Languages'

function ModalCreateOrderComponent() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nationality: '',
        note: '',
        arrivalDate: '',
        departureDate: '',
        numberOfGuests: '',
        numberOfNights: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };





    const handleSubmit = async (event) => {
        //const [response, setResponse] = useState('');
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            await fetch('http://localhost:4000/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.error('Error:', error);
            })
        }

        setValidated(true);

    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Pridať objednávku
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pridanie objednávky</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="FormAddOrder" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom01">
                                <Form.Label>Meno</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Meno"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label>Priezvisko</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Priezvisko"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Národnosť</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Národnosť"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Select aria-label="Výber jazyka"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                >
                                    <option value="">Vyber jazyk</option>
                                    {LanguageEnum.map((Language) => (
                                        <option key={Language.value} value={Language.value}>
                                            {Language.text}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Dátum príchodu</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    name="arrivalDate"
                                    value={formData.arrivalDate}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                <Form.Label>Dátum odchodu</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    name="departureDate"
                                    value={formData.departureDate}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom07">
                                <Form.Label>Počet hostí</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="1"
                                    min="0"
                                    required
                                    name="numberOfGuests"
                                    value={formData.numberOfGuests}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom08">
                                <Form.Label>Počet nocí</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="1"
                                    min="0"
                                    required
                                    name="numberOfNights"
                                    value={formData.numberOfNights}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zavrieť
                    </Button>
                    <Button type="submit" form="FormAddOrder">
                        Uložiť
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalCreateOrderComponent