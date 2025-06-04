import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import PriceTypeEnum from '../../../Enums/PriceType';

function PriceItemModalComponent({ modalConfig, closeModal, savePriceData }) {
    const [validated, setValidated] = useState(false);

    const [priceFormData, setPriceFormData] = useState({
        priceType: '',
        priceNote: '',
        paidByGuest: '',
        paidToHost: '',
        serviceFeeGuest: '',
        serviceFeeHost: '',
    });

    useEffect(() => {
        if (modalConfig.mode == 'edit') {
            setPriceFormData(modalConfig.data)
        }
    }, []);
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPriceFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitForm = (event) => {
        event.preventDefault();
        savePriceData(priceFormData)
        closeModal()
    };


    return (
        <>
            <Modal show={true} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{modalConfig.mode === 'create' ? 'Pridanie ' : 'Úprava'} cenovej položky</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="FormAddPrice" noValidate validated={validated} onSubmit={(e) => submitForm(e)}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Typ</Form.Label>
                                <Form.Select aria-label="Výber národnosti"
                                    required
                                    name="priceType"
                                    value={priceFormData.priceType}
                                    onChange={handleChange}
                                >
                                    {PriceTypeEnum.map((priceType) => (
                                        <option key={priceType.value} value={priceType.value}>
                                            {priceType.text}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Zaplatené hosťom</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    step="1"
                                    min="0"
                                    name="paidByGuest"
                                    value={priceFormData.paidByGuest}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label>Vyplatené hostiteľovi</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    step="1"
                                    min="0"
                                    name="paidToHost"
                                    value={priceFormData.paidToHost}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                <Form.Label>Servisný poplatok hosťa</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="1"
                                    min="0"
                                    required
                                    name="serviceFeeGuest"
                                    value={priceFormData.serviceFeeGuest}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom06">
                                <Form.Label>Servisný poplatok hostiteľa</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="1"
                                    min="0"
                                    required
                                    name="serviceFeeHost"
                                    value={priceFormData.serviceFeeHost}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Zadaná hodnota je nesprávna.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-6">
                            <Form.Label>Poznámka</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="priceNote"
                                    placeholder="Zanechajte komentár"
                                    style={{ height: '100px' }}
                                    onChange={handleChange}
                                    value={priceFormData.priceNote}
                                />
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Zavrieť
                    </Button>
                    <Button type="submit" form="FormAddPrice">
                        Uložiť
                    </Button>
                </Modal.Footer>

            </Modal >
        </>
    );
}

export default PriceItemModalComponent