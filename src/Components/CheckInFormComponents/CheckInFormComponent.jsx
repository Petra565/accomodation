import { useState, useEffect } from 'react'
//Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';


//DatePicker
import DatePicker from 'react-datepicker';

//Enums
import LanguageEnum from '../../Enums/Languages'
import CountryCodesEnum from '../../Enums/CountryCodes'
import DocumentTypeEpsum from '../../Enums/DocumentTypeEpsum'

import moment from 'moment';

function CheckInFormComponent() {
    const [validated, setValidated] = useState(false);
    const [guestData, setGuestData] = useState(
        {
            firstName: '',
            lastName: '',
            nationality: '',
            dateOfBirth: '',
            documentType: '',
            documentNumber: '',
            address: {
                street: '',
                houseNumber: '',
                country: '',
                city: '',
                postalCode: '',
            },
        },
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGuestData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>
            <Form className="p-4" id="FormCheckInByGuest" noValidate validated={validated} onSubmit={handleSubmit}>
                <h6>1.Osoba-Objednávateľ</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Meno"
                            name="firstName"
                            value={guestData.firstName}
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
                            value={guestData.lastName}
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
                            value={guestData.nationality}
                            onChange={handleChange}
                        >
                            <option value="">Vyberte národnosť</option>
                            {CountryCodesEnum.map((CountryCode) => (
                                <option key={CountryCode.value} value={CountryCode.value}>
                                    {CountryCode.text}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Dátum narodenia</Form.Label>
                        <DatePicker
                            className="datePicker"
                            selected={guestData.dateOfBirth}
                            onChange={(date) => handleChange({ target: { value: date, name: 'dateOfBirth' } })}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Klikni pre výber dátumu"
                        />

                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Typ dokladu</Form.Label>
                        <Form.Select aria-label="Výber národnosti"
                            required
                            name="documentType"
                            value={guestData.documentType}
                            onChange={handleChange}
                        >
                            <option value="">Vyberte typ dokumentu</option>
                            {DocumentTypeEpsum.map((documentType) => (
                                <option key={documentType.value} value={documentType.value}>
                                    {documentType.text}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Label>Číslo dokladu</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Číslo doladu"
                            name="documentNumber"
                            value={guestData.documentNumber}
                            onChange={handleChange}
                        />

                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <h6>Adresa trvalého pobytu</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Ulica</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ulica"
                            name="street"
                            value={guestData.address.street}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label>Číslo domu</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Číslo domu"
                            required
                            name="houseNumber"
                            value={guestData.address.houseNumber}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom08">
                        <Form.Label>Štát</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Štát"
                            name="country"
                            value={guestData.address.country}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-6">
                    <Form.Group as={Col} md="6" controlId="validationCustom08">
                        <Form.Label>Mesto</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Mesto"
                            name="city"
                            value={guestData.address.city}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom08">
                        <Form.Label>PSČ</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="PSČ"
                            name="postalCode"
                            value={guestData.address.postalCode}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </Form >
        </>
    );
}
export default CheckInFormComponent