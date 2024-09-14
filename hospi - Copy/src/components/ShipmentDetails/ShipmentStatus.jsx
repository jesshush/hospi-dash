import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ShipmentStatus = ({ shipments }) => {
  const statusCount = shipments.reduce((acc, shipment) => {
    acc[shipment.status] = (acc[shipment.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Shipments by Status',
      },
    },
  };

  return (
    <div>
      <h3>Total Shipments by Status</h3>
      <div style={{ width: '400px', height: '400px', margin: 'auto' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ShipmentStatus;
