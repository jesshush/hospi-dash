import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Alert } from 'react-bootstrap';
import InventoryAlerts from './InventoryAlerts'; // Ensure this path is correct
import './DrugInventoryTable.css'; // Ensure you have this CSS file

// Export the drugs data
export const drugs = [
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2024-09-02", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-08-30", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2024-08-30", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
    { name: "Paracetamol", brand: "Tylenol", mfgDate: "2023-01-15", expDate: "2025-01-15", cost: "250", quantity: 150 },
    { name: "Ibuprofen", brand: "Advil", mfgDate: "2022-06-20", expDate: "2024-06-20", cost: "164", quantity: 80 },
    { name: "Insulin", brand: "Humalog", mfgDate: "2023-03-12", expDate: "2025-03-12", cost: "200", quantity: 60 },
    { name: "Amoxicillin", brand: "Amoxil", mfgDate: "2022-08-05", expDate: "2024-08-05", cost: "250", quantity: 90 },
    { name: "Vitamin D", brand: "D3", mfgDate: "2023-02-28", expDate: "2025-02-28", cost: "189", quantity: 120 },
];

const DrugInventoryTable = ({ drugsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortColumn, setSortColumn] = useState('name');
    const [expiringDrugs, setExpiringDrugs] = useState([]);
    const [imminentDrugs, setImminentDrugs] = useState([]);
    const [showAlerts, setShowAlerts] = useState(false);

    useEffect(() => {
        const checkExpiryDates = () => {
            const today = new Date();
            const oneDayFromNow = new Date(today);
            oneDayFromNow.setDate(today.getDate() + 1);
            const tenDaysFromNow = new Date(today);
            tenDaysFromNow.setDate(today.getDate() + 10);

            const expiring = drugs.filter(drug => {
                const expDate = new Date(drug.expDate);
                return expDate <= oneDayFromNow && expDate > today;
            });

            const imminent = drugs.filter(drug => {
                const expDate = new Date(drug.expDate);
                return expDate <= tenDaysFromNow && expDate > oneDayFromNow;
            });

            if (expiring.length > 0 || imminent.length > 0) {
                setExpiringDrugs(expiring);
                setImminentDrugs(imminent);
                setShowAlerts(true);
            } else {
                setShowAlerts(false);
            }
        };

        checkExpiryDates();
    }, []);

    // Filtering drugs based on search term
    const filteredDrugs = drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting drugs based on selected column and sort order
    const sortDrugs = (data, column) => {
        return data.slice().sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[column] > b[column] ? 1 : -1;
            } else {
                return a[column] < b[column] ? 1 : -1;
            }
        });
    };

    const sortedDrugs = sortDrugs(filteredDrugs, sortColumn);

    // Pagination logic
    const indexOfLastDrug = currentPage * drugsPerPage;
    const indexOfFirstDrug = indexOfLastDrug - drugsPerPage;
    const currentDrugs = sortedDrugs.slice(indexOfFirstDrug, indexOfLastDrug);

    const totalPages = Math.ceil(filteredDrugs.length / drugsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (column) => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);
    };

    return (
        <div className="inventory-page">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Drug Inventory</h3>
            </div>

            {showAlerts && (
                <div className="alert mb-3">
                    {expiringDrugs.length > 0 && (
                        <InventoryAlerts
                            alertType="danger"
                            alertMessage={`The following drugs are expiring in 1 day: ${expiringDrugs.map(drug => `${drug.name} (${drug.expDate})`).join(', ')}.`}
                        />
                    )}
                    {imminentDrugs.length > 0 && (
                        <InventoryAlerts
                            alertType="warning"
                            alertMessage={`The following drugs are expiring within 10 days: ${imminentDrugs.map(drug => `${drug.name} (${drug.expDate})`).join(', ')}.`}
                        />
                    )}
                </div>
            )}

            <Form className="search-bar mb-3">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search by drug name or brand"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {/* <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                            Drug Name {sortColumn === 'name' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                        </th>
                        <th onClick={() => handleSort('brand')} style={{ cursor: 'pointer' }}>
                            Brand {sortColumn === 'brand' && (sortOrder === 'asc' ? '🔼' : '🔽')}
                        </th> */}
                        <th>Drug Name</th>
                        <th>Brand</th>
                        <th>Manufactured Date</th>
                        <th>Expiry Date</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDrugs.length > 0 ? (
                        currentDrugs.map((drug, index) => (
                            <tr key={index}>
                                <td>{drug.name}</td>
                                <td>{drug.brand}</td>
                                <td>{drug.mfgDate}</td>
                                <td>{drug.expDate}</td>
                                <td>{drug.cost}</td>
                                <td>{drug.quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No drugs found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="pagination d-flex justify-content-center">
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

export default DrugInventoryTable;
