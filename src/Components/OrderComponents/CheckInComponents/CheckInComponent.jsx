import { useState, useEffect } from 'react'
import UniversalModalComponent from '../../CommonComponents/UniversalModalComponent.jsx'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function CheckInComponent({ orderData, sendChangedDataFromCheckInTab }) {
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
        fetch(`http://localhost:4000/checkIn/markAsFinishedByHost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        }).then(data => {
            sendChangedDataFromCheckInTab(data.order);
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
                    <Badge className="m-2" bg='danger'>{orderData.checkInData?.state}</Badge>
                </Col-2>
            </Row>

            <Button className="m-2"
                variant="secondary"
                onClick={handleClick}
            >
                Odkaz na formular</Button>
            <Button
                className="m-2"
                variant="primary"
                onClick={handleDoneCheckIn}
            >
                Oznacit ako vybaveny</Button>

            <UniversalModalComponent
                modalConfig={modalConfig}
            >

            </UniversalModalComponent >
        </>
    );
}

export default CheckInComponent