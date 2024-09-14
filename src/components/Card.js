// src/components/Card.js
import React from 'react';
import { Card } from 'react-bootstrap';

const DashboardCard = ({ title, value, onClick }) => (
    <Card className="m-2 cursor-pointer" onClick={onClick}>
        <Card.Body className="text-center">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{value}</Card.Text>
        </Card.Body>
    </Card>
);

export default DashboardCard;
