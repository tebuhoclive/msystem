import React from 'react';

// Define the props type
interface StatCardProps {
  title: string; // Title of the stat card
  value: string; // Value to display
  icon: React.ReactNode; // Icon can be any React node (e.g., string, JSX element)
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="dashboard-card stat-card">
      <div className="stat-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default StatCard;
