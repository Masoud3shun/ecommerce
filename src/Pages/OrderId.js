import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";

const userToken = localStorage.getItem("userToken");

const OrderId = () => {
  const { OrderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  const fetchOrderData = async () => {
    try {
      const { data } = await axios.get(
        `http://kzico.runflare.run/order/${OrderId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setOrderData(data);
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, [OrderId]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ margin: "1rem", padding: "1rem" }}>
      <Typography variant="h5">Order Items</Typography>
      <ul>
        {orderData.orderItems.map((item) => (
          <li key={item.product._id}>
            <Link to={`/products/${item.product._id}`}>
              <Typography>Item: {item.product.name}</Typography>
            </Link>
            <Typography>Quantity: {item.qty}</Typography>
            <Typography>Brand: {item.product.brand}</Typography>
            <Typography>Color:{item.product.color}</Typography>
            <Typography>price:{item.product.price}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant="h5">Shipping Address</Typography>
      <Typography>City: {orderData.shippingAddress.city}</Typography>
      <Typography>Street: {orderData.shippingAddress.address}</Typography>
      <Typography>
        Postal Code: {orderData.shippingAddress.postalCode}
      </Typography>
      <Typography>Phone Number: {orderData.shippingAddress.phone}</Typography>
      <Typography>Payment Method: {orderData.paymentMethod}</Typography>
      <Typography>Total Price: {orderData.totalPrice}</Typography>
    </Card>
  );
};

export default OrderId;
