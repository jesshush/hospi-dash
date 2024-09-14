import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

function Charts() {
  useEffect(() => {
    // Function to destroy existing charts
    const destroyExistingCharts = () => {
      const chartIds = [
        'production-trends-chart',
        'batch-verification-chart',
        'inventory-levels-chart'
      ];
    
      chartIds.forEach(id => {
        const chart = Chart.getChart(id); // Get chart by ID
        if (chart) {
          chart.destroy(); // Destroy chart if it exists
        }
      });
    };
    

    // Destroy existing charts before creating new ones
    destroyExistingCharts();

    // Production Trends Chart
    const ctxProductionTrends = document.getElementById('production-trends-chart').getContext('2d');
    new Chart(ctxProductionTrends, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Units Produced',
          data: [2000, 2500, 3000, 2800, 3200, 3400, 3600],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          fill: true,
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Units Produced'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });

    // Batch Verification Status Chart
    const ctxBatchVerification = document.getElementById('batch-verification-chart').getContext('2d');
    new Chart(ctxBatchVerification, {
      type: 'pie',
      data: {
        labels: ['Verified', 'Unverified', 'Pending Verification'],
        datasets: [{
          label: 'Batch Verification Status',
          data: [60, 25, 15],
          backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: "'Roboto', sans-serif",
                weight: 600
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || '';
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });

    // Inventory Levels Chart
    const ctxInventoryLevels = document.getElementById('inventory-levels-chart').getContext('2d');
    new Chart(ctxInventoryLevels, {
      type: 'bar',
      data: {
        labels: ['Antibiotics', 'Vaccines', 'Painkillers', 'Insulin'],
        datasets: [{
          label: 'Inventory (Units)',
          data: [5000, 3000, 2000, 1500],
          backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 20
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Units in Inventory'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Drug Categories'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });

    // Cleanup function to destroy charts when component unmounts
    return () => {
      const charts = Chart.getChart('production-trends-chart') || Chart.getChart('batch-verification-chart') || Chart.getChart('inventory-levels-chart');
      if (charts) {
        charts.destroy();
      }
    };
  }, []);

  return (
    <section className="container my-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm rounded">
            <h2 className="h4">Production Trends</h2>
            <canvas id="production-trends-chart"></canvas>
            <small className="text-muted">Monthly units produced</small>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm rounded">
            <h2 className="h4">Batch Verification Status</h2>
            <canvas id="batch-verification-chart"></canvas>
            <small className="text-muted">Verified vs. Unverified</small>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card p-3 shadow-sm rounded">
            <h2 className="h4">Inventory Levels</h2>
            <canvas id="inventory-levels-chart"></canvas>
            <small className="text-muted">Stock available by category</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Charts;
