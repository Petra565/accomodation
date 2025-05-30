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
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

//DatePicker
import DatePicker from 'react-datepicker';

//Enums
import LanguageEnum from '../../Enums/Languages'
import CountryCodesEnum from '../../Enums/CountryCodes'

import moment from 'moment';

function ModalOrderComponent({ reloadOrdersTable, closeModal, modalConfig }) {
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('/MainInfo')

    const [mainFormData, setMainFormData] = useState({
        firstName: '',
        lastName: '',
        nationality: '',
        note: '',
        arrivalDate: '',
        departureDate: '',
        numberOfGuests: '',
        numberOfNights: '',
        prices: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMainFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleChangeData = (priceData) => {
        setMainFormData({
            ...mainFormData,
            prices: priceData
        })

    }

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
                    setMainFormData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const fetchData = (version) => {
        fetch(`http://localhost:4000/order/${version}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mainFormData),
        }).then(response => {
            closeModal()
            reloadOrdersTable()
        }).catch(error => {
            console.error('Error:', error);
        })
    }
    useEffect(() => {

        if (mainFormData.arrivalDate && mainFormData.departureDate) {
            const start = new Date(mainFormData.arrivalDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(mainFormData.departureDate);
            end.setHours(0, 0, 0, 0);

            const diffInMs = end - start;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            const nights = Math.max(0, Math.round(diffInDays))

            setMainFormData(prev => ({
                ...prev,
                numberOfNights: nights
            }))
        } else {
            setMainFormData(prev => ({
                ...prev,
                numberOfNights: 0
            }));
        }
    }, [mainFormData.arrivalDate, mainFormData.departureDate])

    return (
        <>
            <Modal show={true} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title> {modalConfig.mode === 'create' ? 'Pridanie ' : 'Úprava'} objednávky </Modal.Title>
                </Modal.Header>

                {
                    loading ? <>
                        <span>Nacitavam</span>
                    </> : <>
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
                                <Nav.Item>
                                    <Nav.Link eventKey="CheckInData">Check-in</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Form id="FormAddOrder" noValidate validated={validated} onSubmit={handleSubmit} className={activeTab === '/MainInfo' ? 'd-block' : 'd-none'}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <Form.Label>Meno</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Meno"
                                            name="firstName"
                                            value={mainFormData.firstName}
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
                                            value={mainFormData.lastName}
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
                                            value={mainFormData.nationality}
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
                                            value={mainFormData.note}
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
                                        <DatePicker
                                            className="datePicker"
                                            selected={mainFormData.arrivalDate}
                                            onChange={(date) => handleChange({ target: { value: date, name: 'arrivalDate' } })}
                                            dateFormat="dd.MM.yyyy"
                                            placeholderText="Klikni pre výber dátumu"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            Zadaná hodnota je nesprávna.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                                        <Form.Label>Dátum odchodu</Form.Label>
                                        <DatePicker
                                            className="datePicker"
                                            selected={mainFormData.departureDate}
                                            onChange={(date) => handleChange({ target: { value: date, name: 'departureDate' } })}
                                            dateFormat="dd.MM.yyyy"
                                            placeholderText="Klikni pre výber dátumu"
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
                                            value={mainFormData.numberOfGuests}
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
                                            disabled
                                            name="numberOfNights"
                                            value={mainFormData.numberOfNights}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Zadaná hodnota je nesprávna.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                            </Form>

                            <div className={activeTab === 'PriceList' ? 'd-block' : 'd-none'}>
                                <PriceListComponent
                                    mainFormData={mainFormData}
                                    changeData={(priceData) => handleChangeData(priceData)}
                                />
                            </div>
                                <div className={activeTab === 'CheckInData' ? 'd-block' : 'd-none'}>
                                    <Row>
                                        <Col-2>
                                            <Badge className="m-2" bg='danger'>Neprijate udaje</Badge>
                                        </Col-2>

                                    </Row>

                                <Button className="m-2" variant="primary">Odkaz na formular</Button>
                                <Button className="m-2" variant="secondary">Oznacit ako vybaveny</Button>
                            </div>
                        </Modal.Body>
                    </>
                }


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