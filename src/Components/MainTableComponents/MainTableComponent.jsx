import { useState, useEffect } from 'react'
import ModalCreateOrderComponent from '../OrderComponents/ModalCreateOrderComponent.jsx'
import NavBarComponent from '../MainTableComponents/NavBarComponent.jsx'
import OrderFilterComponent from '../MainTableComponents/OrderFilterComponent.jsx'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function MainTableComponent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/order/list')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Načítavam...</p>;
    if (error) return <p>Chyba: {error.message}</p>;

    return (
        <>
            <div className="MainContainer">
                <NavBarComponent></NavBarComponent>
                <ModalCreateOrderComponent></ModalCreateOrderComponent>
                <OrderFilterComponent></OrderFilterComponent>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Meno</th>
                            <th>Priezvisko</th>
                            <th>Typy cenovych poloziek</th>
                            <th>Datum prichodu</th>
                            <th>Datum odchodu</th>
                            <th>Stav</th>
                            <th>Pocet hosti</th>
                            <th>Pocet Noci</th>
                            <th>Check-in</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default MainTableComponent