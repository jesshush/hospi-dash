import React, { useState } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';
import './DrugOrders.css';

// Sample data for drug orders
const sampleOrders = [
    { id: '001', drugName: 'Paracetamol', brand: 'Tylenol', quantity: 100, orderDate: '2024-08-01', status: 'Completed' },
    { id: '002', drugName: 'Ibuprofen', brand: 'Advil', quantity: 50, orderDate: '2024-08-03', status: 'Completed' },
    { id: '003', drugName: 'Insulin', brand: 'Humalog', quantity: 30, orderDate: '2024-08-10', status: 'Cancelled' },
    { id: '004', drugName: 'Amoxicillin', brand: 'Amoxil', quantity: 80, orderDate: '2024-08-12', status: 'Pending' },
    { id: '005', drugName: 'Vitamin D', brand: 'D3', quantity: 120, orderDate: '2024-08-15', status: 'Completed' },
    { id: '006', drugName: 'Paracetamol', brand: 'Tylenol', quantity: 150, orderDate: '2024-08-20', status: 'Completed' },
    { id: '007', drugName: 'Ibuprofen', brand: 'Advil', quantity: 70, orderDate: '2024-08-22', status: 'Pending' },
    { id: '008', drugName: 'Insulin', brand: 'Humalog', quantity: 60, orderDate: '2024-08-25', status: 'Completed' },
    { id: '009', drugName: 'Amoxicillin', brand: 'Amoxil', quantity: 90, orderDate: '2024-08-27', status: 'Cancelled' },
    { id: '010', drugName: 'Vitamin D', brand: 'D3', quantity: 110, orderDate: '2024-08-30', status: 'Completed' },
    { id: '011', drugName: 'Aspirin', brand: 'Bayer', quantity: 200, orderDate: '2024-08-02', status: 'Completed' },
    { id: '012', drugName: 'Lisinopril', brand: 'Prinivil', quantity: 90, orderDate: '2024-08-05', status: 'Completed' },
    { id: '013', drugName: 'Cetirizine', brand: 'Zyrtec', quantity: 60, orderDate: '2024-08-07', status: 'Pending' },
    { id: '014', drugName: 'Metformin', brand: 'Glucophage', quantity: 120, orderDate: '2024-08-13', status: 'Completed' },
    { id: '015', drugName: 'Prednisone', brand: 'Deltasone', quantity: 40, orderDate: '2024-08-17', status: 'Cancelled' },
    { id: '016', drugName: 'Lorazepam', brand: 'Ativan', quantity: 70, orderDate: '2024-08-19', status: 'Completed' },
    { id: '017', drugName: 'Amoxicillin', brand: 'Amoxil', quantity: 110, orderDate: '2024-08-21', status: 'Completed' },
    { id: '018', drugName: 'Azithromycin', brand: 'Zithromax', quantity: 80, orderDate: '2024-08-23', status: 'Pending' },
    { id: '019', drugName: 'Alprazolam', brand: 'Xanax', quantity: 50, orderDate: '2024-08-26', status: 'Cancelled' },
    { id: '020', drugName: 'Omeprazole', brand: 'Prilosec', quantity: 100, orderDate: '2024-08-29', status: 'Completed' },
    { id: '021', drugName: 'Simvastatin', brand: 'Zocor', quantity: 90, orderDate: '2024-08-31', status: 'Completed' },
    { id: '022', drugName: 'Hydrochlorothiazide', brand: 'Microzide', quantity: 150, orderDate: '2024-08-04', status: 'Pending' },
    { id: '023', drugName: 'Gabapentin', brand: 'Neurontin', quantity: 60, orderDate: '2024-08-09', status: 'Completed' },
    { id: '024', drugName: 'Levothyroxine', brand: 'Synthroid', quantity: 80, orderDate: '2024-08-11', status: 'Completed' },
    // Add more data as needed
];

const itemsPerPage = 12;
const DrugOrders = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    // Filter orders based on search input
    const filteredOrders = sampleOrders.filter(
        (order) =>
            order.drugName.toLowerCase().includes(search.toLowerCase()) ||
            order.brand.toLowerCase().includes(search.toLowerCase()) ||
            order.status.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Calculate current page orders
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="drug-orders">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Drug Orders</h3>
            </div>
            <Form className="mb-3">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search by drug name or brand"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Drug Name</th>
                        <th>Brand</th>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.drugName}</td>
                                <td>{order.brand}</td>
                                <td>{order.quantity}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Pagination */}
            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
};

export default DrugOrders;
