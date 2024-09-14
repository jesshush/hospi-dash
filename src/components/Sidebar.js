// src/components/Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <aside className="sidebar bg-dark text-light p-3">
        <h3 className="text-center">Hospital Dashboard</h3>
        <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Overview</Nav.Link>
            <Nav.Link as={Link} to="/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/drug-orders">Drug Orders</Nav.Link>
            <Nav.Link as={Link} to="/patients">Patients</Nav.Link>
            <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
        </Nav>
    </aside>
);

export default Sidebar;
