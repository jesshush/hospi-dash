import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import './Sidebar.css'; // Import the CSS for the sidebar

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
            <button
                className="sidebar-toggle"
                onClick={toggleSidebar}
                aria-controls="sidebar"
                aria-expanded={isOpen}
            >
                <span className="hamburger-icon"></span>
            </button>
            <Collapse in={isOpen}>
                <div id="sidebar" className="sidebar">
                    <h2 className="sidebar-header">Hospital Dashboard</h2>
                    <ul className="sidebar-links list-unstyled">
                        <li><Link to="/" className="sidebar-link">Overview</Link></li>
                        <li><Link to="/inventory" className="sidebar-link">Inventory</Link></li>
                        <li><Link to="/orders" className="sidebar-link">Drug Orders</Link></li>
                        <li><Link to="/patients" className="sidebar-link">Patients</Link></li>
                        <li><Link to="/reports" className="sidebar-link">Reports</Link></li>
                        <li><Link to="/settings" className="sidebar-link">Settings</Link></li>
                    </ul>
                </div>
            </Collapse>
        </div>
    );
};

export default Sidebar;
