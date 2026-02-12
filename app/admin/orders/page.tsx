"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  orderStatus: string;
  totalAmount: number;
  userId?: {
    email?: string;
  };
};

const AdminOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await axios.get("/api/orders/admin");
      const result = response.data.OrderHistory;
      setOrderHistory(result);
      console.log(result);
    };
    fetchOrderHistory();
  }, []);

  const handleChange = async (value: any, item: any) => {
    const response = await axios.patch(`/api/orders/admin/${item._id}`, {
      status: value,
    });
    setOrderHistory((prev: any[]) =>
      prev.map((order) =>
        order._id === item._id ? { ...order, orderStatus: value } : order,
      ),
    );
  };

  const handleRefund = async (item: any) => {
    const response = axios.post(`/api/orders/admin/refund/${item}`);
    console.log("refund response", response);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orderHistory.map((item: any) => (
        <>
          <div key={item._id} className="border p-4 mb-4">
            <p>User: {item.userId?.email}</p>
            <p>Total: ${item.totalAmount}</p>
            {/* <p>Status: {item.orderStatus}</p> */}
            <select
              value={item.orderStatus}
              onChange={(e) => handleChange(e.target.value, item)}
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => handleRefund(item._id)}
              className="bg-blue-200 p-2 rounded-2xl "
            >
              Refund
            </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default AdminOrderHistory;
