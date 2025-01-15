"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Chart data
  const data = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };


  return (
    <div className="chart-container" style={{ width: "100%", height: "200px", display: 'flex', justifyContent: 'center' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
