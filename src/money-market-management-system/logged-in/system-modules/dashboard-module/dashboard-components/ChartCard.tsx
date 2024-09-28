import React from 'react';
import { Chart, ChartProps,} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartCardProps {
  title: string;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  chartOptions?: any;
  details?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, chartData, chartOptions, details }) => {
  return (
    <div className="dashboard-card chart-card">
      <h3>{title}</h3>
      {details && <p className="chart-details">{details}</p>}
      <Chart type="bar" data={chartData} options={chartOptions} /> {/* Specify chart type here */}
    </div>
  );
};

export default ChartCard;
