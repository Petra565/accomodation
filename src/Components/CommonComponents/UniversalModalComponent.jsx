import { useState, useEffect } from 'react'

//Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
function UniversalModalComponent({ modalConfig }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        modalConfig ? handleShow() : handleClose();

    }, [modalConfig])

    if (!modalConfig) return null;

    return (
        <>
            <Modal show={show} onHide={() => modalConfig.btnCloseCallback()}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalConfig.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalConfig.text}</Modal.Body>
                <Modal.Footer>

                    {
                        modalConfig.buttons.map((button, index) => (
                            <Button
                                variant={button.variant}
                                key={index}
                                onClick={() => {
                                    button.callback();
                                    handleClose();
                                }}
                            >
                                {button.text}
                            </Button>
                        ))
                    }

                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UniversalModalComponent