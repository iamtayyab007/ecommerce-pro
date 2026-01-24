"use client";
import axios from "axios";

import { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await axios.get("/api/orders/user");
      const result = response.data.userOrderHistory;
      setOrders(result);
      console.log(result);
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders &&
        orders.length > 0 &&
        orders.map((item: any) => (
          <div key={item._id} className="border p-4 mb-4">
            <p>Total: ${item.totalAmount}</p>
            <p>Status: {item.orderStatus}</p>
            {item.items.map((i: any) => (
              <div key={i.product_id}>
                {i.title} * {i.quantity}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default OrderHistory;
