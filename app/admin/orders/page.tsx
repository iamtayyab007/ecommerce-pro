"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const AdminOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await axios.get("/api/orders/admin");
      const result = response.data.OrderHistory;
      setOrderHistory(result);
      console.log(result);
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orderHistory.map((item: any) => (
        <div key={item._id} className="border p-4 mb-4">
          <p>User: {item.userId?.email}</p>
          <p>Total: ${item.totalAmount}</p>
          <p>Status: {item.orderStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderHistory;
