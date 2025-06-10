import { useState, useEffect } from 'react'
import PriceItemModalComponent from './PriceItemModalComponent.jsx'


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';


function PriceListComponent({ changeData, mainFormData }) {

    const [priceData, setPriceData] = useState([]);
    const [priceModalConfig, setPriceModalConfig] = useState({ show: false });

    useEffect(() => {
        setPriceData(mainFormData.prices);
    }, []);

    const savePriceDataHandler = (data) => {
        if (priceModalConfig.mode == 'edit') {
            let priceDataCopy = [...priceData];

            priceDataCopy[priceModalConfig.index] = data;

            setPriceData(priceDataCopy)

        }
        else {
            setPriceData([...priceData, data])
        }

    }

    useEffect(() => {
        changeData(priceData);
    }, [priceData]);

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Typ</th>
                        <th>Zaplatené hosťom</th>
                        <th>Vyplatené hostiteľovi</th>
                        <th>SP hosťa</th>
                        <th>SP hostiteľa</th>
                        <th>Poznámka</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {priceData.map((price, i) => {
                        return (
                            <tr key={i}>
                                <td>{price.priceType}</td>
                                <td>{price.paidByGuest}€</td>
                                <td>{price.paidToHost}€</td>
                                <td>{price.serviceFeeGuest}€</td>
                                <td>{price.serviceFeeHost}€</td>
                                <td>{price.priceNote}</td>
                                <td>
                                    <span className="DetailIconPriceListTable"
                                        onClick={() => setPriceModalConfig({ show: true, mode: 'edit', data: price, index: i })}>
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
            <Col md={3}>
                <Button className="m-2" variant="primary" onClick={() => setPriceModalConfig({ show: true, mode: 'create' })} >
                    Pridat cenovu polozku
                </Button>
            </Col>
            {
                priceModalConfig.show && (
                    <PriceItemModalComponent
                        modalConfig={priceModalConfig}
                        savePriceData={(data) => savePriceDataHandler(data)}
                        closeModal={() => setPriceModalConfig({ show: false })}
                    ></PriceItemModalComponent>
                )
            }
        </>
    );
}

export default PriceListComponent