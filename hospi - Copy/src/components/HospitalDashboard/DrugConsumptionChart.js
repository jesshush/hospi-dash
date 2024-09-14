import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Registering required Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const DashboardCharts = () => {
    const [selectedDrugs, setSelectedDrugs] = useState([]);
    const [startMonth, setStartMonth] = useState('January');
    const [endMonth, setEndMonth] = useState('December');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Sample data
    const drugConsumptionData = {
        labels: months,
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

    const drugOptions = drugConsumptionData.datasets.map(dataset => ({
        value: dataset.label.toLowerCase(),
        label: dataset.label
    }));

    const handleDrugChange = (selectedOptions) => {
        setSelectedDrugs(selectedOptions.map(option => option.value));
    };

    const handleStartMonthChange = (event) => {
        setStartMonth(event.target.value);
    };

    const handleEndMonthChange = (event) => {
        setEndMonth(event.target.value);
    };

    // Filter and update chart data
    const getFilteredData = () => {
        const startIdx = months.indexOf(startMonth);
        const endIdx = months.indexOf(endMonth) + 1;
        const labels = months.slice(startIdx, endIdx);

        const datasets = drugConsumptionData.datasets.filter(dataset => 
            selectedDrugs.length === 0 || selectedDrugs.includes(dataset.label.toLowerCase())
        ).map(dataset => ({
            ...dataset,
            data: dataset.data.slice(startIdx, endIdx),
        }));

        return {
            labels,
            datasets
        };
    };

    const chartData = getFilteredData();

    const chartOptions = {
        responsive: true,
        legend: { display: true, position: 'top' },
        title: { display: true, text: 'Drug Consumption Trends' },
        scales: {
            y: { beginAtZero: true }
        }
    };

    return (
            <div className="chart-container">
                <h3>Drug Consumption Trends</h3>
                <hr />
                <Form className="mb-3">
                    <Form.Group controlId="drugSelect">
                        <Form.Label>Select Drugs</Form.Label>
                        <Select
                            isMulti
                            options={drugOptions}
                            onChange={handleDrugChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="monthRange" className="mt-3">
                        <Form.Label>Select Time Range</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={startMonth}
                                    onChange={handleStartMonthChange}
                                >
                                    {months.map(month => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col>
                                <Form.Control
                                    as="select"
                                    value={endMonth}
                                    onChange={handleEndMonthChange}
                                >
                                    {months.map(month => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <Line data={chartData} options={chartOptions} />
            </div>
    );
};

export default DashboardCharts;
