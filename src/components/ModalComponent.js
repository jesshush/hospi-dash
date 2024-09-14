// src/components/ModalComponent.js
import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

const ModalComponent = ({ show, handleClose, title, items }) => (
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
                {items.map((item, index) => (
                    <ListGroup.Item key={index} variant={item.type}>
                        {item.message}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Modal.Body>
    </Modal>
);

export default ModalComponent;
