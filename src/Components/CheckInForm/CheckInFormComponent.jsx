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
import DocumentTypeEnum from '../../Enums/DocumentType'
import NationalitiesEnum from '../../Enums/Nationalities'

import moment from 'moment';

function CheckInFormComponent({ index, sendNewGuestData, isFirstGuest }) {
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

    //ak sa zmenia data posli ich vrchnejsiemu komponentu
    useEffect(() => {
        sendNewGuestData(newGuestData)
    }, [newGuestData])

    // ak sa vyplnia data uloz ich do objektu newGuestData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGuestData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // ak sa vyplnia data pre adresu uloz ich do objektu newGuestData
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
            <div className="p-sm-4 mb-4 rounded border bg-white p-1">

                <h6>
                    {index + 1}. Osoba{index === 0 && '-Objednávateľ'} </h6>

                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Meno</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="firstName"
                            value={newGuestData.firstName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Priezvisko</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastName"
                            value={newGuestData.lastName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Národnosť</Form.Label>
                        <Form.Select aria-label="Výber národnosti"
                            required
                            name="nationality"
                            value={newGuestData.nationality}
                            onChange={handleChange}
                        >
                            {NationalitiesEnum.map((Nationality) => (
                                <option key={Nationality.value} value={Nationality.value}>
                                    {Nationality.textSk}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Dátum narodenia</Form.Label>
                        <DatePicker
                            required
                            className={`form-control ${validated && !newGuestData.dateOfBirth ? 'is-invalid' : ''}`}
                            selected={newGuestData.dateOfBirth}
                            onChange={(date) => handleChange({ target: { value: date, name: 'dateOfBirth' } })}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Klikni pre výber dátumu"
                        />
                        {validated && !newGuestData.dateBirth && (
                            <div className="invalid-feedback d-block">
                                Toto pole je povinné.
                            </div>
                        )}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Typ dokladu</Form.Label>
                        <Form.Select aria-label="Výber národnosti"
                            required
                            name="documentType"
                            value={newGuestData.documentType}
                            onChange={handleChange}
                        >
                            {DocumentTypeEnum.map((documentType) => (
                                <option key={documentType.value} value={documentType.value}>
                                    {documentType.text}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Číslo dokladu</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            name="documentNumber"
                            value={newGuestData.documentNumber}
                            onChange={handleChange}
                        />

                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <h6>Adresa trvalého pobytu</h6>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Ulica</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="street"
                            value={newGuestData.address.street}
                            onChange={handleAddressChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Číslo domu</Form.Label>
                        <Form.Control
                            type="number"
                            step="1"
                            min="0"
                            required
                            name="houseNumber"
                            value={newGuestData.address.houseNumber}
                            onChange={handleAddressChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12">
                        <Form.Label>Štát</Form.Label>
                        <Form.Select
                            required
                            type="text"
                            name="country"
                            value={newGuestData.address.country}
                            onChange={handleAddressChange}
                        >
                            {CountryCodesEnum.map((CountryCode) => (
                                <option key={CountryCode.value} value={CountryCode.value}>
                                    {CountryCode.text}
                                </option>
                            ))}

                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-6">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Mesto</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="city"
                            value={newGuestData.address.city}
                            onChange={handleAddressChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>PSČ</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="postalCode"
                            value={newGuestData.address.postalCode}
                            onChange={handleAddressChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Toto pole je povinné.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            </div>
        </>
    );
}
export default CheckInFormComponent