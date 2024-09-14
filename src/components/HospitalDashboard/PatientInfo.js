import React, { useState } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';
import './PatientInfo.css'; // Import custom CSS if needed

const PatientInfo = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredPatientInfo = [
        { id: '001', name: 'John Doe', drugId: 'A123', doctor: 'Dr. Smith', orderDate: '2024-08-01', purchaseTime: '10:00 AM' },
        { id: '002', name: 'Jane Doe', drugId: 'B456', doctor: 'Dr. Jones', orderDate: '2024-08-03', purchaseTime: '11:00 AM' },
        { id: '003', name: 'Alice Johnson', drugId: 'C789', doctor: 'Dr. Adams', orderDate: '2024-08-05', purchaseTime: '09:30 AM' },
        { id: '004', name: 'Bob Brown', drugId: 'D012', doctor: 'Dr. Lee', orderDate: '2024-08-07', purchaseTime: '02:15 PM' },
        { id: '005', name: 'Charlie Green', drugId: 'E345', doctor: 'Dr. Wilson', orderDate: '2024-08-10', purchaseTime: '08:45 AM' },
        { id: '006', name: 'Diana Prince', drugId: 'F678', doctor: 'Dr. Martinez', orderDate: '2024-08-12', purchaseTime: '03:30 PM' },
        { id: '007', name: 'Edward Thompson', drugId: 'G901', doctor: 'Dr. Clark', orderDate: '2024-08-15', purchaseTime: '10:00 AM' },
        { id: '008', name: 'Fiona O\'Connor', drugId: 'H234', doctor: 'Dr. Walker', orderDate: '2024-08-17', purchaseTime: '01:00 PM' },
        { id: '009', name: 'George Harris', drugId: 'I567', doctor: 'Dr. Green', orderDate: '2024-08-20', purchaseTime: '11:15 AM' },
        { id: '010', name: 'Hannah King', drugId: 'J890', doctor: 'Dr. Hall', orderDate: '2024-08-22', purchaseTime: '04:00 PM' },
        { id: '011', name: 'Ian Mitchell', drugId: 'K123', doctor: 'Dr. Scott', orderDate: '2024-08-24', purchaseTime: '09:00 AM' },
        { id: '012', name: 'Jessica Lewis', drugId: 'L456', doctor: 'Dr. Young', orderDate: '2024-08-26', purchaseTime: '12:30 PM' },
        { id: '013', name: 'Kevin Davis', drugId: 'M789', doctor: 'Dr. Adams', orderDate: '2024-08-29', purchaseTime: '02:00 PM' },
        { id: '014', name: 'Laura Evans', drugId: 'N012', doctor: 'Dr. White', orderDate: '2024-08-31', purchaseTime: '10:30 AM' },
        { id: '015', name: 'Michael Robinson', drugId: 'O345', doctor: 'Dr. Lewis', orderDate: '2024-09-02', purchaseTime: '11:45 AM' },
        { id: '016', name: 'Natalie Walker', drugId: 'P678', doctor: 'Dr. Hall', orderDate: '2024-09-05', purchaseTime: '01:30 PM' },
        { id: '017', name: 'Oliver Moore', drugId: 'Q901', doctor: 'Dr. Clark', orderDate: '2024-09-08', purchaseTime: '03:00 PM' },
        { id: '018', name: 'Paula Carter', drugId: 'R234', doctor: 'Dr. Wilson', orderDate: '2024-09-10', purchaseTime: '10:00 AM' },
        { id: '019', name: 'Quincy Adams', drugId: 'S567', doctor: 'Dr. Martinez', orderDate: '2024-09-12', purchaseTime: '12:00 PM' },
        { id: '020', name: 'Rebecca Nelson', drugId: 'T890', doctor: 'Dr. Green', orderDate: '2024-09-15', purchaseTime: '02:30 PM' }
    ];


    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const filteredData = filteredPatientInfo.filter(
        (info) =>
            info.name.toLowerCase().includes(search.toLowerCase()) ||
            info.doctor.toLowerCase().includes(search.toLowerCase())
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="patient-info-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Patient Information</h3>
            </div>
            <div className="text-end mb-3">
                <Form className="search-bar">
                    <Form.Group controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Search by patient name or doctor"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Drug ID</th>
                        <th>Doctor</th>
                        <th>Order Date</th>
                        <th>Purchase Time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((info) => (
                        <tr key={info.id}>
                            <td>{info.id}</td>
                            <td>{info.name}</td>
                            <td>{info.drugId}</td>
                            <td>{info.doctor}</td>
                            <td>{info.orderDate}</td>
                            <td>{info.purchaseTime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </div>
    );
};

export default PatientInfo;
