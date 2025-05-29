import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import PriceTypeEnum from '../../Enums/PriceTypeEnum';

import moment from 'moment';

import DatePicker from 'react-datepicker';

function OrderFilterComponent({ loadFilterData }) {
    const [open, setOpen] = useState(false);



    const [filterData, setFilterData] = useState({
        firstName: '',
        lastName: '',
        PriceType: '',
        applyPriceTypeSum: '',
        arrivalDateFrom: '',
        arrivalDateTo: '',
        departureDateFrom: '',
        departureDateTo: '',
    });

    const handleChangeFilter = (e) => {
        const { name, type, value, checked } = e.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const clearFilterData = () => {
        setFilterData({
            firstName: '',
            lastName: '',
            PriceType: '',
            applyPriceTypeSum: '',
            arrivalDateFrom: '',
            arrivalDateTo: '',
            departureDateFrom: '',
            departureDateTo: '',
        })

        loadFilterData({});
    }
    
    return (
        <>
            <div className="Filter">
                <Button
                    className="btnFilterMainTable mb-2"
                    variant="primary"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Filter
                </Button>

                <Collapse in={open}>
                    <div className="custom-collapse" id="example-collapse-text">
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3" controlId="validationCustom01">
                                <Form.Label>Meno</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Meno"
                                    name="firstName"
                                    value={filterData.firstName}
                                    onChange={handleChangeFilter}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom02">
                                <Form.Label>Priezvisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Priezvisko"
                                    name="lastName"
                                    value={filterData.lastName}
                                    onChange={handleChangeFilter}
                                />
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom03">
                                <Form.Label>Typ cenovej položky</Form.Label>
                                <Form.Select
                                    aria-label="Výber typu cenovej položky"
                                    name="priceType"
                                    value={filterData.priceType}
                                    onChange={handleChangeFilter}
                                >
                                    {PriceTypeEnum.map((priceType) => (
                                        <option key={priceType.value} value={priceType.value}>
                                            {priceType.text}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} md="3" controlId="validationCustom04">
                                <Form.Label>Iba zvolený typ cenovej položky</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    name="applyPriceTypeSum"
                                    checked={filterData.applyPriceTypeSum}
                                    onChange={handleChangeFilter}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom05">
                                <Form.Label>Dátum príchodu od</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.arrivalDateFrom}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'arrivalDateFrom' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom06">
                                <Form.Label>Dátum príchodu do</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.arrivalDateTo}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'arrivalDateTo' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom07">
                                <Form.Label>Dátum odchodu od</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.departureDateFrom}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'departureDateFrom' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="validationCustom08">
                                <Form.Label>Dátum odchodu do</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.departureDateTo}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'departureDateTo' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 mx-0">
                            <Button
                                onClick={() => loadFilterData(filterData)}
                                className="col-2  me-2"
                                md="2"
                                variant="primary">Vyhľadať</Button>
                            <Button
                                onClick={() => clearFilterData()}
                                className="col-2"
                                md="2"
                                variant="secondary">Vynulovať filter</Button>
                        </Row>
                    </div>

                </Collapse>

            </div>
        </>
    );
}

export default OrderFilterComponent