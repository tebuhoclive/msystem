import React from "react";

interface CardProps {
  title: string;
  value: string;
  percentage: string;
  styleClass: string;
}

const Card: React.FC<CardProps> = ({
  title,
  value,
  percentage,
  styleClass,
}) => {
  return (
    
    <div className={`${styleClass}`}>
      <div className="status">
        <div className="info">
          <h3>{title}</h3>
          <h1>{value}</h1>
        </div>
        <div className="progresss">
          <svg>
            <circle cx="38" cy="38" r="36"></circle>
          </svg>
          <div className="percentage">
            <p>{percentage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
