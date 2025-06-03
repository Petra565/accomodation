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

function CheckInFormComponent({ index, sendNewGuestData }) {
    const [validated, setValidated] = useState(false);
    const [newGuestData, setNewGuestData] = useState(
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
    useEffect(() => {
        sendNewGuestData(newGuestData)
    }, [newGuestData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGuestData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewGuestData(prevData => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    }

    

    return (
        <>
            <div className="border p-4 rounded mb-4">
                <h6>{index + 1}.Osoba{index + 1 === 1 && '- Objednávateľ'}</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Meno"
                            name="firstName"
                            value={newGuestData.firstName}
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
                            value={newGuestData.lastName}
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
                            value={newGuestData.nationality}
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
                            selected={newGuestData.dateOfBirth}
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
                            value={newGuestData.documentType}
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
                            value={newGuestData.documentNumber}
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
                            value={newGuestData.address.street}
                            onChange={handleAddressChange}
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
                            value={newGuestData.address.houseNumber}
                            onChange={handleAddressChange}
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
                            value={newGuestData.address.country}
                            onChange={handleAddressChange}
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
                            value={newGuestData.address.city}
                            onChange={handleAddressChange}
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
                            value={newGuestData.address.postalCode}
                            onChange={handleAddressChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Zadaná hodnota je nesprávna.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </div>
        </>
    );
}
export default CheckInFormComponent