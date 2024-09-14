import React from 'react';
import './InventoryAlerts.css'; 

const StockAlerts = ({ onClose }) => {
    const alerts = [
        { text: "Paracetamol - Expiring in 7 days", color: "bg-warning" },
        { text: "Ibuprofen - Critical Low Stock", color: "bg-danger" },
        { text: "Insulin - Expiring in 3 days", color: "bg-danger" },
        { text: "Amoxicillin - Stock Below Safety Levels", color: "bg-warning" },
        { text: "Vitamin D - Stock Replenished", color: "bg-primary" },
    ];

    return (
        <div className="inventory-alerts">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Stock Alerts</h5>
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className="mt-3">
                {alerts.map((alert, index) => (
                    <div key={index} className={`alert-item text-white p-2 mb-2 ${alert.color}`}>
                        {alert.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockAlerts;
