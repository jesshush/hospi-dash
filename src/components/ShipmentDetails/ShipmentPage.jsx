import React, { useState } from 'react';
import { Table, Pagination, Form, Col, Row } from 'react-bootstrap';
import ShipmentStatus from './ShipmentStatus';
import ShipmentETA from './ShipmentEDA';

const ShipmentsPage = () => {
    // Sample data
    const shipments = [
        { shipmentId: 'S001', eta: '2024-09-05', issues: 'NA', status: 'In Transit', location: 'New York, NY' },
        { shipmentId: 'S002', eta: '2024-09-10', issues: 'Delayed', status: 'Delayed', location: 'Los Angeles, CA' },
        { shipmentId: 'S003', eta: '2024-09-15', issues: 'NA', status: 'Delivered', location: 'Chicago, IL' },
        { shipmentId: 'S004', eta: '2024-09-20', issues: 'NA', status: 'In Transit', location: 'Houston, TX' },
        { shipmentId: 'S005', eta: '2024-09-25', issues: 'NA', status: 'In Transit', location: 'Phoenix, AZ' },
        { shipmentId: 'S006', eta: '2024-09-30', issues: 'None', status: 'Delivered', location: 'Philadelphia, PA' },
        { shipmentId: 'S007', eta: '2024-10-05', issues: 'NA', status: 'In Transit', location: 'San Antonio, TX' },
        { shipmentId: 'S008', eta: '2024-10-10', issues: 'NA', status: 'Delayed', location: 'San Diego, CA' },
        { shipmentId: 'S009', eta: '2024-10-15', issues: 'NA', status: 'Delivered', location: 'Dallas, TX' },
        { shipmentId: 'S010', eta: '2024-10-20', issues: 'NA', status: 'In Transit', location: 'San Jose, CA' }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    // Filter shipments based on search term
    const filteredShipments = shipments.filter(
        shipment =>
            shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.eta.includes(searchTerm) ||
            shipment.issues.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shipment.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredShipments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Shipments Page</h2>

            {/* Search Box */}
            <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4"
            />

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>ETA</th>
                        <th>Issues</th>
                        <th>Status</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((shipment) => (
                        <tr key={shipment.shipmentId}>
                            <td>{shipment.shipmentId}</td>
                            <td>{shipment.eta}</td>
                            <td>{shipment.issues}</td>
                            <td>{shipment.status}</td>
                            <td>{shipment.location}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            <hr />
            <Row>
                <Col md={6}>
                    <ShipmentStatus shipments={shipments} />
                </Col>
                <Col md={6}>
                    <ShipmentETA shipments={shipments} />
                </Col>

            </Row>
                    
            <hr />

        </div>
    );
};

export default ShipmentsPage;
