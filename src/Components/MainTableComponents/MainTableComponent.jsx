import { useState, useEffect } from 'react'
import ModalOrderComponent from '../OrderComponents/ModalOrderComponent.jsx'
import OrderFilterComponent from '../MainTableComponents/OrderFilterComponent.jsx'
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PriceTypeEnum from '../../Enums/PriceTypeEnum';


import moment from 'moment';
import Modal from 'react-bootstrap/Modal';

function MainTableComponent({ sendCalendarData }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderModalConfig, setOrderModalConfig] = useState({ show: false });

    useEffect(() => {
        loadOrdersData();
    }, []);

    const loadOrdersData = (filterPayload = {}) => {
        const queryParams = new URLSearchParams(filterPayload).toString();
        const url = `http://localhost:4000/order/list?${queryParams}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.orders);
                setLoading(false);
                sendCalendarData(data.orders)

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    const getPriceTypeNames = (order) => {
        let priceNames = [];

        if (order.prices) {
            priceNames = order.prices.map((item) => {
                let name = PriceTypeEnum[item.priceType].text
                return name;
            });
        }
        return priceNames;
    }

    const getStateOfOrder = (order) => {
        let date = new Date();
        let arrivalDate = new Date(order.arrivalDate);
        let departureDate = new Date(order.departureDate);

        if (arrivalDate > date) {
            return 'upcoming'
        }
        else if (arrivalDate < date && date < departureDate) {
            return 'active'
        }
        else if (date > departureDate) {
            return 'done'
        }
    }
    const getNumberOfNights = (order) => {
        const start = new Date(order.arrivalDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(order.departureDate);
        end.setHours(0, 0, 0, 0);

        const diffInMs = end - start;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        return Math.round(diffInDays > 0 ? diffInDays : 0);
    };

    if (loading) return <p>Načítavam...</p>;
    if (error) return <p>Chyba: {error.message}</p>;

    return (
        <>
            <div className="MainContainer px-4">

                {orderModalConfig.show && (
                    <ModalOrderComponent
                        modalConfig={orderModalConfig}
                        reloadOrdersTable={() => loadOrdersData()}
                        closeModal={() => setOrderModalConfig({ show: false })}
                    />
                )}

                <Row>
                    <Col md={3}>
                        <Button className="m-2" variant="primary" onClick={() => setOrderModalConfig({ show: true, mode: 'create' })} >
                            Pridať objednávku
                        </Button>
                    </Col>
                    <Col md={3}>
                        <Form.Select className="m-2" aria-label="Default select example">
                            <option value="1">Základná</option>
                            <option value="2">Rozšírená</option>
                            <option value="3">Finančná</option>
                        </Form.Select>
                    </Col>
                </Row>

                <OrderFilterComponent
                    loadFilterData={(filterData) => loadOrdersData(filterData)}
                >
                </OrderFilterComponent>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Meno</th>
                            <th>Priezvisko</th>
                            <th>Typy cenových položiek</th>
                            <th>Dátum príchodu</th>
                            <th>Dátum odchodu</th>
                            <th>Stav</th>
                            <th>Počet hostí</th>
                            <th>Počet nocí</th>
                            <th>Check-in</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((order, i) => {
                            return (
                                <tr key={i}>
                                    <td>{order.firstName}</td>
                                    <td>{order.lastName}</td>
                                    <td>{((getPriceTypeNames(order))).join(', ')}</td>
                                    <td>{order.arrivalDate ? moment(order.arrivalDate).format('DD.MM.YYYY') : ''}</td>
                                    <td>{order.departureDate ? moment(order.departureDate).format('DD.MM.YYYY') : ''}</td>
                                    <td>
                                        {
                                            getStateOfOrder(order) == 'upcoming' && (
                                                <Badge bg='primary'>Plánovaná</Badge>
                                            )
                                        }
                                        {
                                            getStateOfOrder(order) == 'active' && (
                                                <Badge bg='success'>Aktívna</Badge>
                                            )
                                        }
                                        {
                                            getStateOfOrder(order) == 'done' && (
                                                <Badge bg='warning'>Vybavená</Badge>
                                            )
                                        }
                                    </td>
                                    <td>{order.numberOfGuests}</td>
                                    <td>{
                                        order._id && (
                                            getNumberOfNights(order)
                                        )
                                    }
                                    </td>
                                    <td>{order.checkInData?.state}</td>
                                    <td>
                                        {
                                            order._id && (
                                                <span className="DetailIconMainTable"
                                                    onClick={() => setOrderModalConfig({ show: true, mode: 'edit', id: order._id })}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="MainTableIcon bi bi-list-ul" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                                    </svg>
                                                </span>
                                            )
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default MainTableComponent