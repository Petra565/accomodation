import { useState, useEffect } from 'react'
import { orderEditState } from '../../Services/CheckInServices'
import UniversalModalComponent from '../../CommonComponents/UniversalModalComponent.jsx'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function CheckInComponent({ orderData, sendChangedDataFromCheckInTab, reloadOrdersTable }) {
    const [modalConfig, setModalConfig] = useState(null)

    const handleDoneCheckIn = () => {
        setModalConfig({
            title: "Oznacit ako prijate",
            btnCloseCallback: clearModalConfig,
            text: "Naozaj chcete oznacit ako prijate?",
            buttons: [
                { text: 'Zavriet', variant: 'secondary', callback: clearModalConfig },
                { text: 'Oznacit ako prijate', variant: 'primary', callback: callChangeCheckInState },
            ]
        })
    }

    const clearModalConfig = () => {
        setModalConfig(null)
    }

    const callChangeCheckInState = () => {
        setModalConfig(null)
        changeCheckInState(orderData)
    }

    const changeCheckInState = (orderData) => {
        orderEditState(orderData)
            .then(data => {
                sendChangedDataFromCheckInTab(data.order);
                reloadOrdersTable()
                console.log(data.order)

            }).catch(error => {
                console.error('Error:', error);
            })
    }

    const handleClick = () => {
        window.open('/CheckIn/' + orderData._id, '_blank');
    }

    return (
        <>
            <Row>
                <Col-2>
                    {
                        orderData.checkInData?.state == 'notFinished' &&
                        <Badge className="mt-3 mx-2 fs-6 px-3 py-2" bg='danger'>Neprijaté údaje</Badge>
                    }
                    {
                        orderData.checkInData?.state == 'finishedByHost' &&
                        <Badge className="mt-3 mx-2 fs-6 px-3 py-2" bg='success'>Vyplnené hostiteľom</Badge>
                    }
                    {
                        orderData.checkInData?.state == 'finishedByGuest' &&
                        <Badge className="mt-3 mx-2 fs-6 px-3 py-2" bg='success'>Vyplnené hosťom</Badge>
                    }
                </Col-2>
            </Row>
            {
                orderData.checkInData?.state == 'notFinished' &&
                <>
                    <Button className="m-2"
                        variant="secondary"
                        onClick={handleClick}
                    >
                        Odkaz na formulár</Button>
                    <Button
                        className="m-2"
                        variant="primary"
                        onClick={handleDoneCheckIn}
                    >
                        Označiť ako vybavený</Button>
                </>
            }
            <UniversalModalComponent
                modalConfig={modalConfig}
            >

            </UniversalModalComponent >
        </>
    );
}

export default CheckInComponent