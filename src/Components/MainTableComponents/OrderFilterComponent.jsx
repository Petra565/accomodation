import { useState, useEffect } from 'react'
/*import CreateComponent from './CreateComponent.jsx'*/
import Button from 'react-bootstrap/Button';


function OrderFilterComponent() {



    return (
        <>
            <div className="Filter">
                <Button className="btnFilterMainTable mb-2" variant="primary">Filter</Button>
            </div>
        </>
    );
}

export default OrderFilterComponent