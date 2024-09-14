import React from 'react';
import { Alert } from 'react-bootstrap';

const InventoryAlerts = ({ alertType, alertMessage }) => {
    const alertVariant = alertType === 'danger' ? 'danger' : 'warning'; // Red for danger, yellow for warning

    return (
        <Alert variant={alertVariant}>
            {alertMessage}
        </Alert>
    );
};

export default InventoryAlerts;
