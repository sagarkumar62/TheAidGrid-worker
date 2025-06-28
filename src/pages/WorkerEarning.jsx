import React from "react";
import WorkerNavbar from "../components/WorkerNavbar";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const weeklyData = [
  { day: "Mon", earnings: 300 },
  { day: "Tue", earnings: 500 },
  { day: "Wed", earnings: 200 },
  { day: "Thu", earnings: 700 },
  { day: "Fri", earnings: 400 },
  { day: "Sat", earnings: 900 },
  { day: "Sun", earnings: 450 },
];

const monthlyData = [
  { week: "Week 1", earnings: 2200 },
  { week: "Week 2", earnings: 1800 },
  { week: "Week 3", earnings: 2400 },
  { week: "Week 4", earnings: 2000 },
];

const WorkerEarning = () => {
  const totalEarnings = weeklyData.reduce((sum, day) => sum + day.earnings, 0);

  // Adding earnings summary data
  const earningsSummary = {
    today: 1450,
    weekly: 9600,
    walletBalance: 3500,
  };

  const barChartData = {
    labels: weeklyData.map((item) => item.day),
    datasets: [
      {
        label: "Earnings (₹)",
        data: weeklyData.map((item) => item.earnings),
        backgroundColor: "#10B981",
        borderRadius: 6,
      },
    ],
  };

  const lineChartData = {
    labels: monthlyData.map((item) => item.week),
    datasets: [
      {
        label: "Monthly Earnings (₹)",
        data: monthlyData.map((item) => item.earnings),
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WorkerNavbar />

      <div className="container mx-auto px-32 py-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Earnings</h1>

        {/* Earnings Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-lg text-gray-600 mb-1">Today's Earnings</h2>
            <p className="text-3xl font-bold text-green-600">
              ₹{earningsSummary.today}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-lg text-gray-600 mb-1">Weekly Earnings</h2>
            <p className="text-3xl font-bold text-blue-600">
              ₹{earningsSummary.weekly}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-lg text-gray-600 mb-1">Wallet Balance</h2>
            <p className="text-3xl font-bold text-purple-600">
              ₹{earningsSummary.walletBalance}
            </p>
          </div>
        </div>

        {/* Weekly Earnings Bar Chart */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Weekly Earnings
          </h3>
          <Bar data={barChartData} options={chartOptions} />
        </div>

        {/* Monthly Earnings Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Monthly Earnings
          </h3>
          <Line data={lineChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default WorkerEarning;
