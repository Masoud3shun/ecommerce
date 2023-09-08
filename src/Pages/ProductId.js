import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Grid,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../providers/auth_provider";

const ProductId = () => {
  const auth = useAuth();
  const { productId } = useParams();
  const [prodData, setProdData] = useState({});
  const [rrating, setRrating] = useState(0);
  const [cntstk, setCntstk] = useState(0);

  const GetProd = async () => {
    try {
      const { data } = await axios.get(
        `http://kzico.runflare.run/product/${productId}`
      );
      console.log(data);
      setProdData(data);
      setRrating(data.rating);
      setCntstk(data.countInStock);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    GetProd();
  }, [productId]);

  return (
    <div className="prodshow">
      <Card sx={{ width: "90vw", height: "85vh", margin: "1rem" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CardMedia
                sx={{
                  height: "80vh",
                  objectFit: "contain",
                }}
                component="img"
                image={prodData.image}
                title={prodData.name}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                {prodData.name}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Brand: {prodData.brand}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Category: {prodData.category}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Color: {prodData.color}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Count in Stock: {prodData.countInStock}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Price: ${prodData.price}
              </Typography>
              <Typography>
                <Rating
                  size="large"
                  name="read-only"
                  value={rrating}
                  readOnly
                  precision={0.1}
                />
                <Typography
                  sx={{ textAlign: "center" }}
                  variant="h6"
                  color="text.secondary"
                >
                  ({prodData.numReviews} Reviews)
                </Typography>
              </Typography>
              {auth.cartItems.some((item) => item._id === productId) ? (
                <CardActions>
                  <Button
                    size="large"
                    onClick={() => auth.handleChangeCart(prodData, "decrement")}
                    disabled={
                      auth.cartItems.find((item) => item._id === productId)
                        .quantity === 1
                    }
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography variant="h5">
                    {
                      auth.cartItems.find((item) => item._id === productId)
                        .quantity
                    }
                  </Typography>
                  <Button
                    size="large"
                    onClick={() => auth.handleChangeCart(prodData, "increment")}
                    disabled={
                      cntstk === 0 ||
                      auth.cartItems.find((item) => item._id === productId)
                        .quantity >= cntstk
                    }
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    size="large"
                    color="error"
                    onClick={() => auth.handleChangeCart(prodData, "delete")}
                  >
                    <DeleteIcon />
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button
                    size="large"
                    disabled={cntstk === 0}
                    onClick={() => auth.handleChangeCart(prodData, "increment")}
                  >
                    <AddShoppingCartIcon />
                    Add to Cart
                  </Button>
                </CardActions>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductId;
