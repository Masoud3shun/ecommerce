import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAuth } from "../providers/auth_provider";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const savedAdrs = JSON.parse(localStorage.getItem("shippingAddress"));
  const userToken = localStorage.getItem("userToken");
  const { cartItems, emptyCart } = useAuth();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleDone = async () => {
    setErr("");
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const ordrItems = cartItems.map((item) => ({
        product: item._id,
        qty: item.quantity,
      }));

      const response = await axios.post(
        "http://kzico.runflare.run/order/submit",
        {
          orderItems: ordrItems,
          shippingAddress: {
            address: savedAdrs.Address,
            city: savedAdrs.City,
            postalCode: savedAdrs.PostalCode,
            phone: savedAdrs.PhoneNumber,
          },
          paymentMethod: "ship",
          shippingPrice: "500",
          totalPrice: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shippingAddress");
        emptyCart();
        navigate("/");
      } else throw response;
    } catch (error) {
      console.log(error);
      setErr("Failed to submit cart");
    }
  };

  return (
    <div style={{ padding: "5%" }}>
      <Grid container spacing={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">color</TableCell>
                <TableCell align="right">quantity</TableCell>
                <TableCell align="right">price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={item.image}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.color}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          mt={2}
          mb={2}
          width="95vw"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          px={2}
          py={1}
          bgcolor="white"
          borderRadius="1rem"
        >
          <Typography variant="h6" style={{ marginBottom: "8px" }}>
            Shipping Address
          </Typography>
          <Typography>City: {savedAdrs.City}</Typography>
          <Typography>Address: {savedAdrs.Address}</Typography>
          <Typography>Postal Code: {savedAdrs.PostalCode}</Typography>
          <Typography>Phone Number: {savedAdrs.PhoneNumber}</Typography>
        </Box>
        <Box
          mt="auto"
          width="95vw"
          display="flex"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Link className="lrnmor" to="/Cart">
            <Button variant="contained">Edit</Button>
          </Link>
          <Button variant="contained" onClick={handleDone}>
            Done
          </Button>
        </Box>
        <div style={{ textAlign: "center", flexGrow: 1 }}>
          {err.length !== 0 ? (
            <Typography style={{ color: "red", textAlign: "center" }}>
              {err}
            </Typography>
          ) : undefined}
        </div>
      </Grid>
    </div>
  );
};

export default Checkout;
