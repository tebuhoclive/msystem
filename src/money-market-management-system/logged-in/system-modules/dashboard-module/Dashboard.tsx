import { useEffect, useRef, useState } from "react";
import Toolbar from "../../shared/components/toolbar/Toolbar";
import ErrorBoundary from "../../../../shared/components/error-boundary/ErrorBoundary";
import { LoadingEllipsis } from "../../../../shared/components/loading/Loading";
import { useAppContext } from "../../../../shared/functions/Context";
import "./Dashboard.scss";
import StatCard from "./dashboard-components/StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollarSign,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ChartCard from "./dashboard-components/ChartCard";
import { observer } from "mobx-react-lite";
import { Grid } from "@mui/material";
import DoughnutChart from "../../../../shared/components/graph-components/DoughnutChart";
import ProductCard from "./ProductCard";

const Dashboard = observer(() => {
  const [loading, setLoading] = useState(false);

  // const chartData = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       label: "Sales",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: "rgba(75, 192, 192, 0.6)",
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       display: true,
  //     },
  //   },
  // };

  // Sample statistics data
  const stats = [
    { title: "Total Sales", value: "$50,000", icon: "💵" },
    { title: "New Customers", value: "150", icon: "👥" },
    { title: "Total Inventory", value: "300", icon: "📦" },
    { title: "Orders This Month", value: "75", icon: "🛒" },
  ];

  return (
    <div>
      {!loading && (
        <div className="page uk-section uk-section-small overview">
          <div className="uk-container uk-container-expand dashboard-container">
            {/* Sticky Header Section */}
            <div className="sticky-top">
              <h1>Dashboard</h1>
              <hr />
            </div>
  
            {/* Main Dashboard Content */}
            <div className="main-content">
              {/* Stats Section */}
              <div className="dashboard-row">
                <div className="stats-card">
                  <h3 className="uk-card-title">Total Products</h3>
                  <p className="stats-value">120</p>
                </div>
  
                <div className="stats-card">
                  <h3 className="uk-card-title">Total Stock</h3>
                  <p className="stats-value">450</p>
                </div>
  
                <div className="stats-card">
                  <h3 className="uk-card-title">Low Stock Items</h3>
                  <p className="stats-value">15</p>
                </div>
  
                <div className="stats-card">
                  <h3 className="uk-card-title">New Orders</h3>
                  <p className="stats-value">20</p>
                </div>
              </div>
  
              {/* Product Cards Section */}
              <div className="dashboard-row">
                <StatCard
                  title="Total Sales"
                  value="$15,000"
                  icon={<FontAwesomeIcon icon={faDollarSign} />}
                />
                <StatCard
                  title="New Users"
                  value="1,200"
                  icon={<FontAwesomeIcon icon={faUsers} />}
                />
                <StatCard
                  title="Sales Growth"
                  value="30%"
                  icon={<FontAwesomeIcon icon={faChartLine} />}
                />
                {/* <ChartCard
                  title="Monthly Sales"
                  chartData={chartData}
                  chartOptions={chartOptions}
                  details="This chart shows the sales performance over the last six months."
                /> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
  
});

export default Dashboard;
