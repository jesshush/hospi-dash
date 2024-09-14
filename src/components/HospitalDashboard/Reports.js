import React, { useState } from 'react'; 
import { Table, Pagination, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Reports.css';

// Dummy data generator
const generateDummyData = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const data = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    data.push({
      date: date.toISOString().split('T')[0],
      patientAdmissions: Math.floor(Math.random() * 20),
      patientDischarges: Math.floor(Math.random() * 15),
      drugsDispensed: Math.floor(Math.random() * 100),
      drugsPurchased: Math.floor(Math.random() * 150), // New field
      revenue: Math.floor(Math.random() * 10000) + 5000,
      expenses: Math.floor(Math.random() * 8000) + 3000,
    });
  }

  return data;
};

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Sample report data with new field
  const sampleReports = [
    { id: '001', reportName: 'Monthly Inventory', date: '2024-08-01', status: 'Completed', totalDrugsPurchased: 500 },
    { id: '002', reportName: 'Quarterly Drug Orders', date: '2024-08-15', status: 'Pending', totalDrugsPurchased: 800 },
    { id: '003', reportName: 'Annual Patient Review', date: '2024-09-01', status: 'Completed', totalDrugsPurchased: 1200 },
    { id: '004', reportName: 'Weekly Stock Alert', date: '2024-08-22', status: 'Completed', totalDrugsPurchased: 300 },
    { id: '005', reportName: 'Daily Patient Admission', date: '2024-08-30', status: 'Pending', totalDrugsPurchased: 700 },
  ];

  const filteredReports = sampleReports.filter(
    (report) =>
      report.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

  const validateDates = () => {
    return startDate && endDate && new Date(startDate) <= new Date(endDate);
  };

  const handleGenerateReport = async () => {
    if (!validateDates()) {
      setGenerationError('Invalid date range. Please ensure the start date is before or the same as the end date.');
      setGenerationSuccess(false);
      return;
    }

    setIsGenerating(true);
    setGenerationError('');
    setGenerationSuccess(false);

    try {
      const reportData = generateDummyData(startDate, endDate);
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text('Hospital Performance Report', 105, 15, null, null, 'center');
      doc.setFontSize(12);
      doc.text(`Date Range: ${startDate} to ${endDate}`, 105, 25, null, null, 'center');

      // Summary statistics
      const summary = reportData.reduce((acc, day) => {
        acc.totalAdmissions += day.patientAdmissions;
        acc.totalDischarges += day.patientDischarges;
        acc.totalDrugsDispensed += day.drugsDispensed;
        acc.totalDrugsPurchased += day.drugsPurchased; // Include new field in summary
        acc.totalRevenue += day.revenue;
        acc.totalExpenses += day.expenses;
        return acc;
      }, { totalAdmissions: 0, totalDischarges: 0, totalDrugsDispensed: 0, totalDrugsPurchased: 0, totalRevenue: 0, totalExpenses: 0 });

      doc.setFontSize(14);
      doc.text('Summary', 14, 35);
      doc.setFontSize(10);
      doc.text(`Total Admissions: ${summary.totalAdmissions}`, 14, 45);
      doc.text(`Total Discharges: ${summary.totalDischarges}`, 14, 52);
      doc.text(`Total Drugs Dispensed: ${summary.totalDrugsDispensed}`, 14, 59);
      doc.text(`Total Drugs Purchased: ${summary.totalDrugsPurchased}`, 14, 66); // New summary field
      doc.text(`Total Revenue: Rs. ${summary.totalRevenue.toLocaleString()}`, 14, 73);
      doc.text(`Total Expenses: Rs. ${summary.totalExpenses.toLocaleString()}`, 14, 80);
      doc.text(`Net Income: Rs. ${(summary.totalRevenue - summary.totalExpenses).toLocaleString()}`, 14, 87);

      // Daily data table
      doc.autoTable({
        startY: 100,
        head: [['Date', 'Admissions', 'Discharges', 'Drugs Dispensed', 'Drugs Purchased', 'Revenue(in Rs.)', 'Expenses(in Rs.)']],
        body: reportData.map(day => [
          day.date,
          day.patientAdmissions,
          day.patientDischarges,
          day.drugsDispensed,
          day.drugsPurchased, // New field in table
          `${day.revenue.toLocaleString()}`,
          `${day.expenses.toLocaleString()}`
        ]),
        margin: { top: 100 },
      });

      // Save the PDF
      doc.save(`Hospital_Performance_Report_${startDate}_to_${endDate}.pdf`);
      setGenerationSuccess(true);
    } catch (error) {
      console.error('Error generating report:', error.message || error);
      setGenerationError('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="reports-page">
      <div className='mb-3'>
        <h3>Reports Overview</h3>
      </div>
      
      <Form className="search-bar mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by report name or status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Report Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Drugs Purchased</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.reportName}</td>
              <td>{report.date}</td>
              <td>{report.status}</td>
              <td>{report.totalDrugsPurchased}</td> {/* New data */}
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-container">
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

      <div className="report-generation mt-4">
        <h4>Generate New Report</h4>
        <Form>
          <Row>
            <Col md={3}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button
                variant="primary"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
            </Col>
          </Row>
        </Form>

        {generationError && <Alert variant="danger" className="mt-3">{generationError}</Alert>}
        {generationSuccess && <Alert variant="success" className="mt-3">Report generated successfully!</Alert>}
      </div>
    </div>
  );
};

export default Reports;
