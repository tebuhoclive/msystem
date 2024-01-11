import React from "react";

// Define a TypeScript interface for the props
interface TableProps {
  headings: string[];
  data: Array<{
    courseName: string;
    courseNumber: string;
    payment: string;
    status: string;
  }>;
}

function Table(props: TableProps) {
  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>
      <table>
        <thead>
          <tr>
            {props.headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>{item.courseName}</td>
              <td>{item.courseNumber}</td>
              <td>{item.payment}</td>
              <td
                className={
                  item.status === "Declined"
                    ? "danger"
                    : item.status === "Pending"
                    ? "warning"
                    : "primary"
                }>
                {item.status}
              </td>
              <td className="primary">Details</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="#">Show All</a>
    </div>
  );
}

export default Table;
