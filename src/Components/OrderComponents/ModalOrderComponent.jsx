import { useState, useEffect } from 'react'
import PriceListComponent from './PriceListComponent.jsx'


//Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';

//DatePicker
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

//Enums
import LanguageEnum from '../../Enums/Languages'
import CountryCodesEnum from '../../Enums/CountryCodes'

import moment from 'moment';

function ModalOrderComponent({ reloadOrdersTable, closeModal, modalConfig }) {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('/MainInfo')

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
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if (modalConfig.mode === "edit") {
                fetchData('edit')
            }
            else {
                fetchData('create')
            }
        }
        setValidated(true);
    };

    useEffect(() => {
        if (modalConfig.mode === "edit") {
            fetch(`http://localhost:4000/order/get/${modalConfig.id}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not OK');
                    }
                    return response.json();
                })
                .then((data) => {
                    setFormData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, []);

    const fetchData = (version) => {
        fetch(`http://localhost:4000/order/${version}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(response => {
            closeModal()
            reloadOrdersTable()
        }).catch(error => {
            console.error('Error:', error);
        })
    }

    return (
        <>
            <Modal show={true} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> {modalConfig.mode === 'create' ? 'Pridanie ' : 'Úprava'} objednávky </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Nav variant="tabs"
                        defaultActiveKey="/MainInfo"
                        onSelect={(selectedKey) => setActiveTab(selectedKey)}
                    >

                        <Nav.Item>
                            <Nav.Link eventKey="/MainInfo">Základné údaje</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="PriceList">Cenník</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    {activeTab === '/MainInfo' &&
                        < Form id="FormAddOrder" noValidate validated={validated} onSubmit={handleSubmit}>
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
                                    <Form.Select aria-label="Výber národnosti"
                                        required
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleChange}
                                    >
                                        <option value="">Vyberte Národnosť</option>
                                        {CountryCodesEnum.map((CountryCode) => (
                                            <option key={CountryCode.value} value={CountryCode.value}>
                                                {CountryCode.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationCustom04">
                                    <Form.Label>Jazyk pre check-in</Form.Label>
                                    <Form.Select aria-label="Výber jazyka"
                                        required
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                    >
                                        <option value="">Vyberte jazyk</option>
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
                                        value={moment(formData.arrivalDate).format('yyyy-MM-DD')}
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
                                        value={moment(formData.departureDate).format('yyyy-MM-DD')}
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
                    }
                    {activeTab === 'PriceList' &&
                        <PriceListComponent
                        formData={formData}
                        />
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Zavrieť
                    </Button>
                    <Button type="submit" form="FormAddOrder">
                        Uložiť
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalOrderComponent