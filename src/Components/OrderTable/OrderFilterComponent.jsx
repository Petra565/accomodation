import { useState, useEffect } from 'react'
import PriceTypeEnum from '../../Enums/PriceType';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

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

    //po zmene parametra filtra ulozi hodnotu do objektu filterData
    const handleChangeFilter = (e) => {
        const { name, type, value, checked } = e.target;
        setFilterData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    //resetovanie filtra
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
                    className="btnFilterMainTable"
                    variant="primary"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    Filter
                </Button>

                <Collapse in={open}>
                    <div className="custom-collapse mb-3 bg-white p-3" id="example-collapse-text">
                        <Row>
                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom01">
                                <Form.Label>Meno</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Meno"
                                    name="firstName"
                                    value={filterData.firstName}
                                    onChange={handleChangeFilter}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom02">
                                <Form.Label>Priezvisko</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Priezvisko"
                                    name="lastName"
                                    value={filterData.lastName}
                                    onChange={handleChangeFilter}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom03">
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

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom04">
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

                        <Row >
                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom05">
                                <Form.Label>Dátum príchodu od</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.arrivalDateFrom}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'arrivalDateFrom' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom06">
                                <Form.Label>Dátum príchodu do</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.arrivalDateTo}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'arrivalDateTo' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom07">
                                <Form.Label>Dátum odchodu od</Form.Label>
                                <DatePicker
                                    className="datePicker"
                                    selected={filterData.departureDateFrom}
                                    onChange={(date) => handleChangeFilter({ target: { value: date, name: 'departureDateFrom' } })}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Klikni pre výber dátumu"
                                />
                            </Form.Group>

                            <Form.Group as={Col} className="mb-3" sm="6" lg="3" controlId="validationCustom08">
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
                        <Row className=" mx-0">
                            <Col sm="6" lg="3">
                                <Button
                                    onClick={() => loadFilterData(filterData)}
                                    className="col-2  me-2 w-100 mb-3"
                                    variant="primary"
                                >Vyhľadať
                                </Button>
                            </Col>
                            <Col sm="6" lg="3">
                                <Button
                                    onClick={() => clearFilterData()}
                                    className="col-2 w-100 mb-3"

                                    variant="secondary"
                                >
                                    Vynulovať filter
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </Collapse>

            </div>
        </>
    );
}

export default OrderFilterComponent