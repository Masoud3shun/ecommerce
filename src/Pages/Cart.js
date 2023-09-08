import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth_provider";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cartItems } = useAuth();
  const auth = useAuth();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                <TableCell align="right">price</TableCell>
                <TableCell align="right">quantity</TableCell>
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
                      style={{ width: "5rem", height: "5rem" }}
                      src={item.image}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.color}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => auth.handleChangeCart(item, "decrement")}
                      disabled={item.quantity == 1}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      size="small"
                      onClick={() => auth.handleChangeCart(item, "increment")}
                      disabled={item.quantity >= item.countInStock}
                    >
                      +
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => auth.handleChangeCart(item, "delete")}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          mt="auto"
          width="95vw"
          display="flex"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Typography>Total Price : {totalPrice} $</Typography>
          <Link className="lrnmor" to="/Address">
            <Button variant="contained" disabled={totalPrice === 0}>
              Next
            </Button>
          </Link>
        </Box>
      </Grid>
    </div>
  );
};

export default Cart;
