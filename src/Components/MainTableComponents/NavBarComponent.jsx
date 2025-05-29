import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBarComponent() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Zoznam objednávok</Nav.Link>
                        <Nav.Link as={NavLink} to="/calendar">Kalendár</Nav.Link>
                        <Nav.Link as={NavLink} to="/statistics">Štatistiky</Nav.Link>
                        <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarComponent;
