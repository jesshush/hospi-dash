import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto'; // For Chart.js
import DrugInventoryTable from './DrugInventoryTable'; // Ensure this path is correct
import DrugOrders from './DrugOrders'; // Ensure this path is correct
import './HospitalDashboard.css'; // Ensure this import is correct
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import PatientInfo from './PatientInfo'; // Import PatientInfo component
import StockAlerts from './StockAlerts'; // Import StockAlerts component
import DrugConsumptionChart from './DrugConsumptionChart'; // Import DrugConsumptionChart component
import { Radar } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import Reports from './Reports';
// Define components for the routes
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Contact = () => <div>Contact Page</div>;

const HospitalDashboard = () => {
    const [showInventoryAlertsModal, setShowInventoryAlertsModal] = useState(false);
    const navigate = useNavigate();
    const [key, setKey] = useState('dashboard');

    // Define the function to show the inventory page
    const goToInventory = () => {
        navigate('/inventory');
    };

    // Define the function to show the drug orders page
    const goToDrugOrders = () => {
        navigate('/orders');
    };

    // Function to handle showing the inventory alerts modal
    const handleShowInventoryAlertsModal = () => {
        setShowInventoryAlertsModal(true);
    };

    // Function to close the inventory alerts modal
    const handleCloseInventoryAlertsModal = () => {
        setShowInventoryAlertsModal(false);
    };

    // Sample data for charts
    const inventoryData = {
        labels: ['Paracetamol', 'Ibuprofen', 'Insulin', 'Amoxicillin', 'Cetirizine'],
        datasets: [{
            label: 'Stock Levels',
            data: [150, 80, 60, 100, 210],
            backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6'],
            borderColor: ['#2980b9', '#c0392b', '#d35400', '#27ae60', '#8e44ad'],
            borderWidth: 1
        }]
    };

    const ordersData = {
        labels: ['Ordered', 'Delivered', 'Pending'],
        datasets: [{
            label: 'Drug Orders',
            data: [50, 40, 30],
            backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
            borderColor: ['#27ae60', '#2980b9', '#c0392b'],
            borderWidth: 1
        }]
    };

    const drugConsumptionData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Paracetamol',
                data: [30, 25, 40, 35, 50, 45, 55, 60, 55, 50, 45, 40],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true
            },
            {
                label: 'Ibuprofen',
                data: [20, 18, 25, 30, 35, 32, 40, 42, 38, 36, 34, 30],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                fill: true
            },
            {
                label: 'Insulin',
                data: [15, 12, 18, 20, 22, 25, 30, 32, 35, 34, 30, 28],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                fill: true
            },
            {
                label: 'Amoxicillin',
                data: [10, 15, 20, 18, 22, 24, 28, 30, 35, 32, 28, 25],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                fill: true
            },
            {
                label: 'Amoxicillin2',
                data: [10, 15, 20, 18, 22, 24, 28, 30, 35, 32, 28, 25],
                borderColor: '#f39c11',
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                fill: true
            }
        ]
    };

    // Sample data for drug orders
    const sampleOrders = [
        { id: '001', drugName: 'Paracetamol', quantity: 100, orderDate: '2024-08-01', status: 'Completed' },
        { id: '002', drugName: 'Ibuprofen', quantity: 50, orderDate: '2024-08-03', status: 'Pending' },
        { id: '003', drugName: 'Insulin', quantity: 30, orderDate: '2024-08-10', status: 'Cancelled' },
    ];

    // Display total alerts
    const displayAlerts = [
        { drugName: 'Paracetamol', message: 'Expiring in 2 days', status: 'critical' },
        { drugName: 'Ibuprofen', message: 'Expiring in 5 days', status: 'critical' },
        { drugName: 'Insulin', message: 'Low Stock', status: 'warning' },
        { drugName: 'Amoxicillin', message: 'Expiring in 15 days', status: 'moderate' },
        { drugName: 'Cetirizine', message: 'Expired', status: 'expired' },

    ];

    const displayTotalAlerts = displayAlerts.length;

    const InventoryOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Inventory Distribution by Drug',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const StackedOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <>
            {/* <div className={`hospital-dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}> */}
            <div className={`hospital-dashboard`}>
                {/* <Sidebar /> */}
                {/* <Container fluid className={`${isSidebarOpen ? 'content-shrink' : ''}`}> */}
                <Container fluid>
                    <Row noGutters >
                        {/* <Col xs={2} className="sidebar">
                    <h2 className="text-center">Hospital Dashboard</h2>
                    <ul className="list-unstyled">
                        <li><Link to="/" className="text-light">Overview</Link></li>
                        <li><Link to="/inventory" className="text-light">Inventory</Link></li>
                        <li><Link to="/orders" className="text-light">Drug Orders</Link></li>
                        <li><Link to="/patients" className="text-light">Patients</Link></li>
                        <li><Link to="/reports" className="text-light">Reports</Link></li>
                        <li><Link to="/settings" className="text-light">Settings</Link></li>
                    </ul>
                </Col> */}

                        <Col xs={10} className="main-content mx-auto" >
                            <header className="header">
                                <h1>Dashboard Overview</h1>
                            </header>
                            <Row className="mb-3">
                                <Col>
                                    <div className="card" onClick={() => setKey('dashboard')}>
                                        <h3>Dashboard</h3>
                                        <p>Stats</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="card" onClick={() => setKey('total-drugs')}>
                                        <h3>Total Drugs</h3>
                                        <p>850</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="card" onClick={() => setKey('drugs-ordered')}>
                                        <h3>Drugs Ordered</h3>
                                        <p>120</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="card" onClick={() => setKey('reports')}>
                                        <h3>Reports</h3>
                                        <p>5 reports</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="card" onClick={() => setKey('patients-admitted')}>
                                        <h3>Patients Admitted</h3>
                                        <p>45</p>
                                    </div>
                                </Col>
                            </Row>
                            <div className="tabContent">
                                <Tabs
                                    id="dashboard-tabs"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="hiddenTabs" // Class to hide the tab headers
                                >
                                    <Tab eventKey="dashboard">
                                        <br />

                                        <Row className="mb-3">
                                            <Col md={7}>
                                                <div className="chart-container">
                                                    <Bar data={inventoryData} options={InventoryOptions} />
                                                </div>
                                            </Col>
                                            <Col md={5}>
                                                <div className="chart-container">
                                                    <h3>Inventory Alerts</h3> Total: {displayTotalAlerts}
                                                    <hr />
                                                    <div className='alertBar'>
                                                        <ul className="list-unstyled">
                                                            {displayAlerts.map((alert, index) => (
                                                                <li key={index} className={`alert ${alert.status}`}>
                                                                    <p>{alert.drugName}: {alert.message}</p>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row className="mb-3">
                                            <Col md={8}>
                                                {/* <div className="chart-container">
                                            <h3>Drug Consumption Trends</h3>
                                            <hr />
                                            <Line data={drugConsumptionData} options = {{ responsive: true,  legend: { display: true, position: 'top' }, title: { display: true, text: 'Drug Consumption Trends' }, scales: { y: { beginAtZero: true } } }} />
                                            {/* <Bar data={drugConsumptionData} options={StackedOptions} /> 
                                            {/* <Radar data={drugConsumptionData} /> 
                                        </div> */}

                                                <DrugConsumptionChart />

                                            </Col>
                                            <Col md={4}>
                                                <div className="chart-container">
                                                    <h3>Drug Orders</h3>
                                                    <hr />
                                                    <Pie data={ordersData} options={{ responsive: true }} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Tab>
                                    {/* DRUGS inventory table */}
                                    <Tab eventKey="total-drugs">
                                        <DrugInventoryTable drugsPerPage={12} />
                                    </Tab>

                                    <Tab eventKey="drugs-ordered">
                                        <DrugOrders />
                                    </Tab>
                                    <Tab eventKey="reports">
                                        {/* ALL THE REPORTS */}
                                        <Reports />
                                    </Tab>
                                    <Tab eventKey="patients-admitted">
                                        <PatientInfo />
                                    </Tab>
                                </Tabs>
                            </div>
                            {/* <Route path="/orders" element={
                            <div className="drug-orders-page">
                                <h2 className="text-center mb-4">Drug Orders</h2>
                                <div className="text-end mb-3">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate('/')}
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </div>
                                <DrugOrders orders={sampleOrders} />
                            </div>
                        } />
                        <Route path="/patients" element={
                            <div className="patient-info-page">
                                <h2 className="text-center mb-4">Patient Information</h2>
                                <div className="text-end mb-3">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate('/')}
                                        style={{ fontSize: '1rem' }}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </div>
                                <PatientInfo />
                            </div>
                        } />
                        <Route path="/reports" element={<div>Reports Page</div>} />
                        <Route path="/settings" element={<div>Settings Page</div>} />
                    </Routes> */}
                        </Col>
                    </Row>

                    {/* Modal for Inventory Alerts */}
                    <Modal show={showInventoryAlertsModal} onHide={handleCloseInventoryAlertsModal} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Inventory Alerts</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <StockAlerts onClose={handleCloseInventoryAlertsModal} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseInventoryAlertsModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <style jsx>{`
                .hiddenTabs .nav-tabs {
                    display: none;
                }
                .hiddenTabs .tab-content {
                    display: block;
                }
            `}</style>

                </Container>

            </div>
        </>
    );
}

export default HospitalDashboard;
