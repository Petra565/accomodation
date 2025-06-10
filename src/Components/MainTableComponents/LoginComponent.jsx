import { useState, useEffect } from 'react'
import { login } from '../Services/LoginServices';

import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function LoginComponent() {
    const [validated, setValidated] = useState(false);

    const [User, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            login(User)
                .then(data => {
                    const token = data.token;
                    //TOKEN z response si uloz do localstorage
                    sessionStorage.setItem('token', token);
                    if (token)
                    window.location.href='/Orders';
                })
                .catch(error => {
                    console.error('Error:', error);
                })
        }
        setValidated(true);
    }
    
    return (
        <div className='d-flex justify-content-center'>
            <div className="p-4 w-50">
                <h4>Prihlásenie</h4>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="my-2">
                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name="username"
                                value={User.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="my-2">
                        <Form.Group as={Col}>
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                value={User.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mt-4">
                        <Form.Group as={Col}>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Prihlásiť sa
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default LoginComponent;
