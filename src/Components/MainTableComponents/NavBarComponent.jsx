import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponent() {

  
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/orders" className="navLinkMain">Zoznam objednávok</Nav.Link>
                        <Nav.Link as={NavLink} to="/calendar" className="navLinkMain">Kalendár</Nav.Link>
                        <Nav.Link as={NavLink} to="/statistics" className="navLinkMain">Štatistiky</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin" className="navLinkMain">Admin</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    );
}

export default NavBarComponent;
