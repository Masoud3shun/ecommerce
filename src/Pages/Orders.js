import { Box, Button, Card, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const userToken = localStorage.getItem("userToken");
const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const req = async () => {
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setOrdersData(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    req();
  }, []);
  return (
    <Box display="flex" flexDirection="column" marginTop="1rem">
      {ordersData.length === 0 ? (
        <div className="loadin">
          <span className="loader"></span>
        </div>
      ) : (
        ordersData.map((order) => (
          <Card key={order._id} sx={{ margin: "1rem", padding: "1rem" }}>
            <Typography>Payment Method: {order.paymentMethod}</Typography>
            <Typography>Total Price: {order.totalPrice}</Typography>
            <Typography variant="h6">Order Items</Typography>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item.product._id}>
                  Item: {item.product.name}, Quantity: {item.qty}
                </li>
              ))}
            </ul>
            <Typography variant="h6">Shipping Address</Typography>
            <Typography>City: {order.shippingAddress.city}</Typography>
            <Typography>Street: {order.shippingAddress.address}</Typography>
            <Link to={`/orders/${order._id}`} className="lrnmor">
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                Details
              </Button>
            </Link>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Orders;
