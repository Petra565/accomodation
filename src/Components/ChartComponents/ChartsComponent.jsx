import { useState, useEffect } from 'react'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { getChartsSummary, getTableSummary } from '../Services/ChartsServices.js';
import ChartComponent from './ChartComponent.jsx'
import SummaryTableComponent from './SummaryTableComponent.jsx'
import NavBarComponent from '../MainTableComponents/NavBarComponent.jsx';

function ChartsComponent() {
    const [tableData, setTableData] = useState([]);
    const [chartsData, setChartsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        loadOrdersData();

    }, []);

    useEffect(() => {
        console.log(chartsData)
    }, [chartsData]);

    const loadOrdersData = () => {
        getChartsSummary()
            .then((data) => {
                setChartsData(data);
                setLoading(false);

            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

        getTableSummary()
            .then((data) => {
                setTableData(data);
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
            <NavBarComponent />
            <SummaryTableComponent data={tableData}></SummaryTableComponent>
            <ChartComponent data={chartsData.paidByGuest} headerText="Zaplatené hosťom"></ChartComponent>
            <ChartComponent data={chartsData.orderCount} headerText="Počet objednávok"></ChartComponent>
            <ChartComponent data={chartsData.numberOfNightsCount} headerText="Počet nocí"></ChartComponent>
           
        </>
    );

}

export default ChartsComponent