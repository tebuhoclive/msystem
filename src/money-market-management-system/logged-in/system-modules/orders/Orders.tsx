import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import "./Orders.scss";

const Orders = observer(() => {
  useEffect(() => {
    // ordersStore.fetchOrders();
  }, []);

  // if (ordersStore.loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="orders">
      <h1>Orders Management</h1>
      {/* <ul>
        {ordersStore.orders.map((order, index) => (
          <li key={index}>{order}</li>
        ))}
      </ul> */}
      {/* <button onClick={() => ordersStore.addOrder("New Order")}>
        Add Order
      </button> */}
    </div>
  );
});

export default Orders;
