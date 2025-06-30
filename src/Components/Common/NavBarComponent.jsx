import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'
import UniversalModalComponent from './UniversalModalComponent.jsx'

//Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';


function NavBarComponent() {
    const [modalConfig, setModalConfig] = useState(null)

    const clearModalConfig = () => {
        setModalConfig(null)
    }

    const LogOut = () => {
        sessionStorage.clear();
        window.location.href = "/"
    }

    const handleClickLogOut = () => {
        setModalConfig({
            title: "Odhlásenie",
            btnCloseCallback: clearModalConfig,
            text: "Naozaj sa chcete odhlásiť?",
            buttons: [
                { text: 'Zavrieť', variant: 'secondary', callback: clearModalConfig },
                { text: 'Odhlásiť sa', variant: 'danger', callback: () => LogOut() },
            ]
        })
    }

    return (
        <>
            <Navbar bg="white" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/orders" className="navLinkMain">Zoznam objednávok</Nav.Link>
                            <Nav.Link as={NavLink} to="/calendar" className="navLinkMain">Kalendár</Nav.Link>
                            <Nav.Link as={NavLink} to="/statistics" className="navLinkMain">Štatistiky</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                    <Button
                        variant="secondary"
                        onClick={() => handleClickLogOut()}
                    >
                        Odhlásiť
                    </Button>
                </Container>
            </Navbar>
            <UniversalModalComponent
                modalConfig={modalConfig}
            >
            </UniversalModalComponent >
        </>
    );
}

export default NavBarComponent;
