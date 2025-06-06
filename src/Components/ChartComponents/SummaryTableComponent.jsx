import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function SummaryTableComponent({ data }) {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Rok</th>
                        <th>Počet objednávok</th>
                        <th>Zaplatené hosťom</th>
                        <th>Vyplatené hostiteľovi</th>
                        <th>Počet nocí</th>
                        <th>Priemerne zaplatené hosťom</th>
                        <th>Priemerne zaplatené hostiteľovi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((order, i) => {
                        return (
                            <>
                                <tr key={i}>
                                    <td>{order.year}</td>
                                    <td>{order.numberOfOrders}</td>
                                    <td>{order.paidByGuest}</td>
                                    <td>{order.paidToHost}</td>
                                    <td>{order.totalNumberOfNights}</td>
                                    <td>{order.averagePaidByGuest}</td>
                                    <td>{order.averagePaidToHost}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default SummaryTableComponent