import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function ChartComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }
   
    return (
        <>
           
        </>
    );
}

export default ChartComponent