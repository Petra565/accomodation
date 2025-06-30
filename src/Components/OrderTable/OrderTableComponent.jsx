import { useState, useEffect } from 'react'
import ModalOrderComponent from './OrderDetail/ModalOrderComponent.jsx'
import OrderFilterComponent from './OrderFilterComponent.jsx'
import NavBarComponent from '../Common/NavBarComponent.jsx';
import { orderList } from '../Services/OrderServices.js';
import { orderDelete } from '../Services/OrderServices.js';
import UniversalModalComponent from '../Common/UniversalModalComponent.jsx'

//bootstrap
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Enums
import PriceTypeEnum from '../../Enums/PriceType.js';

import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
function MainTableComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderModalConfig, setOrderModalConfig] = useState({ show: false });
    const [modalConfig, setModalConfig] = useState(null)
    const [tableMode, setTableMode] = useState('basic');

    useEffect(() => {
        loadOrdersData();
    }, []);

    //zatvor modal - vycisti modalConfig
    const clearModalConfig = () => {
        setModalConfig(null)
    }

    //funkcia na vymazanie objednavky
    const callHandleDeleteOrder = (orderId) => {
        orderDelete(orderId)
            .then(() => {
                loadOrdersData();
                setLoading(false);
                setModalConfig(null);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    //modal na vymazanie objednavky
    const handleClickDelete = (orderId) => {
        setModalConfig({
            title: "Vymazať objednávku",
            btnCloseCallback: clearModalConfig,
            text: "Naozaj chcete vymazať objednávku?",
            buttons: [
                { text: 'Zavrieť', variant: 'secondary', callback: clearModalConfig },
                { text: 'Vymazať objednávku', variant: 'danger', callback: () => callHandleDeleteOrder(orderId) },
            ]
        })
    }

    //nacitanie objednavok do tabulky
    const loadOrdersData = (filterPayload = {}) => {
        const queryParams = new URLSearchParams(filterPayload).toString(); //vyskladane filtracne parametre pre order list

        orderList(queryParams)
            .then((data) => {
                setData(data.orders);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }

    //zisti nazov portálu z ciselnika
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

    //zistenie stavu objednavky z datumov
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

    //zistenie poctu noci z datumov
    const getNumberOfNights = (order) => {
        const start = new Date(order.arrivalDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(order.departureDate);
        end.setHours(0, 0, 0, 0);

        const diffInMs = end - start;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        return Math.round(diffInDays > 0 ? diffInDays : 0);
    };

    //skryvanie stlpcov tabulky podla toho aky ma mód - zakladna/rozsirena/financna
    const evaluateShowColumnByTableMode = (columnName) => {
        let tableBasic = ['firstName', 'lastName', 'state']
        let tableExtended = ['firstName', 'lastName', 'priceType', 'arrivalDate', 'departureDate', 'state', 'numberOfGuests', 'numberOfNights', 'checkIn']
        let tableFinancial = ['firstName', 'lastName', 'priceType', 'arrivalDate', 'departureDate', 'numberOfGuests', 'numberOfNights', 'paidByGuest', 'paidToHost', 'totalNumberOfNights', 'averagePaidByGuest', 'averagePaidToHost', 'serviceFeeGuest', 'serviceFeeHost']

        if (tableMode === "basic" && tableBasic.includes(columnName)) {
            return ''
        }
        else if (tableMode === "extended" && tableExtended.includes(columnName)) {
            return ''
        }
        else if (tableMode === "financial" && tableFinancial.includes(columnName)) {
            return ''
        }

        return 'd-none'
    };

    if (loading) return <p>Načítavam...</p>;
    if (error) return <p>Chyba: {error.message}</p>;

    return (
        <>
            <NavBarComponent />
            {orderModalConfig.show && (
                <ModalOrderComponent
                    modalConfig={orderModalConfig}
                    reloadOrdersTable={() => loadOrdersData()}
                    closeModal={() => setOrderModalConfig({ show: false })}
                />
            )}

            <Row>
                <Col md={3}>
                    <Button className="w-100 my-2" variant="primary" onClick={() => setOrderModalConfig({ show: true, mode: 'create' })} >
                        Pridať objednávku
                    </Button>
                </Col>
                <Col md={3}>
                    <Form.Select
                        className="my-2"
                        aria-label="Default select example"
                        onChange={(e) => setTableMode(e.target.value)}
                    >
                        <option value="basic">Základná</option>
                        <option value="extended">Rozšírená</option>
                        <option value="financial">Finančná</option>
                    </Form.Select>
                </Col>
            </Row>

            <OrderFilterComponent
                loadFilterData={(filterData) => loadOrdersData(filterData)}
            >
            </OrderFilterComponent>

            <Table striped borderless hover responsive className="tableMain">
                <thead>
                    <tr>
                        <th className={evaluateShowColumnByTableMode('firstName')}>Meno</th>
                        <th className={evaluateShowColumnByTableMode('lastName')}>Priezvisko</th>
                        <th className={evaluateShowColumnByTableMode('priceType')}>Typy cenových položiek</th>
                        <th className={evaluateShowColumnByTableMode('arrivalDate')}>Dátum príchodu</th>
                        <th className={evaluateShowColumnByTableMode('departureDate')}>Dátum odchodu</th>
                        <th className={evaluateShowColumnByTableMode('state')}>Stav</th>
                        <th className={evaluateShowColumnByTableMode('numberOfGuests')}>Počet hostí</th>
                        <th className={evaluateShowColumnByTableMode('numberOfNights')}>Počet nocí</th>
                        <th className={evaluateShowColumnByTableMode('checkIn')}>Check-in</th>
                        <th className={evaluateShowColumnByTableMode('paidByGuest')}>Zaplatené hosťom</th>
                        <th className={evaluateShowColumnByTableMode('paidToHost')}>Vyplatené hostiteľovi</th>
                        <th className={evaluateShowColumnByTableMode('serviceFeeGuest')}>SP hosťa</th>
                        <th className={evaluateShowColumnByTableMode('serviceFeeHost')}>SP hostiteľa</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((order, i) => {
                        return (
                            <tr key={i}>
                                <td className={evaluateShowColumnByTableMode('firstName')}>{order.firstName}</td>
                                <td className={evaluateShowColumnByTableMode('lastName')}>{order.lastName}</td>
                                <td className={evaluateShowColumnByTableMode('priceType')}>{((getPriceTypeNames(order))).join(', ')}</td>
                                <td className={evaluateShowColumnByTableMode('arrivalDate')}>{order.arrivalDate ? moment(order.arrivalDate).format('DD.MM.YYYY') : ''}</td>
                                <td className={evaluateShowColumnByTableMode('departureDate')}>{order.departureDate ? moment(order.departureDate).format('DD.MM.YYYY') : ''}</td>
                                <td className={evaluateShowColumnByTableMode('state')}>
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
                                <td className={evaluateShowColumnByTableMode('numberOfGuests')}>{order.numberOfGuests}</td>
                                <td className={evaluateShowColumnByTableMode('numberOfNights')}>{
                                    order._id && (
                                        getNumberOfNights(order)
                                    )
                                }
                                </td>
                                <td className={evaluateShowColumnByTableMode('checkIn')}>
                                    {
                                        order.checkInData?.state == 'notFinished' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg text-danger" viewBox="0 0 16 16">
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        )

                                    }
                                    {
                                        order.checkInData?.state == 'finishedByHost' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                            </svg>
                                        )

                                    }
                                    {
                                        order.checkInData?.state == 'finishedByGuest' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg text-success" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                                            </svg>
                                        )

                                    }

                                </td>
                                <td className={evaluateShowColumnByTableMode('paidByGuest')}>{order.totalPaidByGuest}€</td>
                                <td className={evaluateShowColumnByTableMode('paidToHost')}>{order.totalPaidToHost}€</td>
                                <td className={evaluateShowColumnByTableMode('serviceFeeGuest')}>{order.totalServiceFeeGuest}€</td>
                                <td className={evaluateShowColumnByTableMode('serviceFeeHost')}>{order.totalServiceFeeHost}€</td>
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
                                <td>
                                    {
                                        order._id && (
                                            <span className="DeleteIconMainTable"
                                                onClick={() =>
                                                    handleClickDelete(order._id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="DeleteIconMainTable bi bi-trash3-fill text-danger" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
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

            <UniversalModalComponent modalConfig={modalConfig} />
        </>
    );
}

export default MainTableComponent