import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ShipmentETA = ({ shipments }) => {
  const etaCount = shipments.reduce((acc, shipment) => {
    const eta = shipment.eta.slice(0, 7); // Group by month
    acc[eta] = (acc[eta] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(etaCount),
    datasets: [
      {
        label: 'Number of Shipments',
        data: Object.values(etaCount),
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Shipments by ETA</h3>
      <div style={{ width: '600px', margin: 'auto', marginTop: 70 }}>
        <Bar data={data} options={{responsive: true, scales: { x: { title: { display: true, text: 'Month' } }, y: { title: { display: true, text: 'Shipments' } } } }} />
      </div>
    </div>
  );
};

export default ShipmentETA;
