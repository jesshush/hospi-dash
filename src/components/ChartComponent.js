// src/components/ChartComponent.js
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, ArcElement, DoughnutController, PieController } from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, ArcElement, DoughnutController, PieController);

const ChartComponent = ({ type, data, options }) => {
    switch (type) {
        case 'bar':
            return <Bar data={data} options={options} />;
        case 'pie':
            return <Pie data={data} options={options} />;
        case 'line':
            return <Line data={data} options={options} />;
        case 'doughnut':
            return <Doughnut data={data} options={options} />;
        default:
            return null;
    }
};

export default ChartComponent;
