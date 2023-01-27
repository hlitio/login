import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

export default function VentanaModal(props) {
    
    

    const [show, setShow] = useState(props.show);
    const handleClose = () => setShow(false)
    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.mensaje}</Modal.Body>
            <Modal.Footer>
                
                <Button variant="primary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}