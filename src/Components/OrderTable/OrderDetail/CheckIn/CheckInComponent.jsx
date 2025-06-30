import { useState, useEffect } from 'react'
import { orderEditState } from '../../../Services/CheckInServices'
import UniversalModalComponent from '../../../Common/UniversalModalComponent.jsx'

//Bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function CheckInComponent({ orderData, sendChangedDataFromCheckInTab, reloadOrdersTable }) {
    const [modalConfig, setModalConfig] = useState(null)

    //otvori modal pre - oznacit za vybaveny
    const handleDoneCheckIn = () => {
        setModalConfig({
            title: "Označiť ako vybavený",
            btnCloseCallback: clearModalConfig,
            text: "Naozaj chcete označiť ako vybavený?",
            buttons: [
                { text: 'Zavrieť', variant: 'secondary', callback: clearModalConfig },
                { text: 'Áno', variant: 'primary', callback: () => changeCheckInState(orderData) },
            ]
        })
    }

    //zatvori modal - precisti modalConfig
    const clearModalConfig = () => {
        setModalConfig(null)
    }

    //sluzba pre oznacenie checkInu ako vybaveny (hostitelom)
    const changeCheckInState = (orderData) => {
        orderEditState(orderData)
            .then(data => {
                sendChangedDataFromCheckInTab(data.order);
                reloadOrdersTable()
                setModalConfig(null)

            }).catch(error => {
                console.error('Error:', error);
            })
    }

    //otvorenie checkIn formularu v novom okne
    const handleClick = () => {
        window.open('/CheckIn/' + orderData._id, '_blank');
    }

    return (
        <>
            <Row>
                <Col-2>
                    {
                        orderData.checkInData?.state == 'notFinished' &&
                        <Badge className="fs-6 mx-2 mt-3 px-3 py-2" bg='danger'>Neprijaté údaje</Badge>
                    }
                    {
                        orderData.checkInData?.state == 'finishedByHost' &&
                        <Badge className="fs-6 mx-2 mt-3 px-3 py-2" bg='success'>Vyplnené hostiteľom</Badge>
                    }
                    {
                        orderData.checkInData?.state == 'finishedByGuest' &&
                        <Badge className="fs-6 mx-2 mt-3 px-3 py-2" bg='success'>Vyplnené hosťom</Badge>
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