import { useState, useEffect } from 'react'
import ModalOrderComponent from '../OrderComponents/ModalOrderComponent.jsx'
import NavBarComponent from '../MainTableComponents/NavBarComponent.jsx'
import OrderFilterComponent from '../MainTableComponents/OrderFilterComponent.jsx'
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';

function MainTableComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderModalConfig, setOrderModalConfig] = useState({ show: false });

    useEffect(() => {
        loadOrdersData();
    }, []);

    const loadOrdersData = () => {
        fetch('http://localhost:4000/order/list')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.orders);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    if (loading) return <p>Načítavam...</p>;
    if (error) return <p>Chyba: {error.message}</p>;

    return (
        <>
            <NavBarComponent></NavBarComponent>
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
                <OrderFilterComponent></OrderFilterComponent>
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
                                    <td>\</td>
                                    <td>{order.arrivalDate ? moment(order.arrivalDate).format('DD.MM.YYYY') : ''}</td>
                                    <td>{order.departureDate ? moment(order.departureDate).format('DD.MM.YYYY') : ''}</td>
                                    <td>\</td>
                                    <td>{order.numberOfGuests}</td>
                                    <td>{order.numberOfNights}</td>
                                    <td>{order.checkInData?.state}</td>
                                    <td>
                                        <span className="DetailIconMainTable"
                                            onClick={() => setOrderModalConfig({ show: true, mode: 'edit', id: order._id })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="MainTableIcon bi bi-list-ul" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            </svg>
                                        </span>
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