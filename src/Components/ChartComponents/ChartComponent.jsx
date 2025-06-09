import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function ChartComponent({ data,headerText }) {
    const [formatedData, setFormatedData] = useState([]);

    useEffect(() => {
        let years = [];

        if (data) {
            //IN vracia index - keby je OF vrati odany item
            for (let i in data.labels) {
                years.push({
                    name: data.labels[i],
                    Celkovo: data.data[0].data[i],
                    
                })
            }
        }

        setFormatedData(years);

    }, [data]);

    return (
        <>
            <Row>
                <Col>
                    <h6 className='mt-3'>{headerText}</h6>
                    <ResponsiveContainer width="100%" height={380} className="bg-white ps-0 pt-4">
                        <LineChart data={formatedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                className="ms-0" />
                            <Tooltip />
                            <Legend
                                wrapperStyle={{
                                    fontSize: '14px',
                                    color: '#333',
                                    padding: 0,
                                }}
                                        />
                            <Line type="monotone" dataKey="Celkovo" stroke=" #0d6efd" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </>
    );
}
export default ChartComponent