"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const listLength = useSelector((state) => state.tasks);
  const completedTask = listLength.filter(
    (item) => item.isCompleted === true
  ).length;
  const notCompletedTask = listLength.filter(
    (item) => item.isCompleted === false
  ).length;

  // Chart data
  const data = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        label: "Task Status",
        data: [completedTask, notCompletedTask],
        backgroundColor: ["#3F9142", "#142E15"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
