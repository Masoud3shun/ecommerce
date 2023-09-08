// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../Styles/Style.css";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   Alert,
//   AlertTitle,
//   ButtonGroup,
//   Grid,
//   Rating,
//   Typography,
//   Button,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Card,
//   Badge,
// } from "@mui/material";
// import { useAuth } from "../providers/auth_provider";

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const auth = useAuth();
//   const getData = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("http://kzico.runflare.run/product/");
//       setData(data);
//       setLoading(false);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   function getInitialCartItems() {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   }

//   const cardHeight = 600;

//   const isInCart = (itemId) => {
//     return auth.cartItems.some((cartItem) => cartItem._id === itemId);
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div className="loadin">
//           <span className="loader"></span>
//         </div>
//       ) : error ? (
//         <span className="loadin">
//           <Alert severity="error" variant="filled">
//             <AlertTitle align="center">Error</AlertTitle>
//             <strong>{error}</strong>
//           </Alert>
//         </span>
//       ) : (
//         <Grid container spacing={2}>
//           {data.map((item) => {
//             const itemInCart = isInCart(item._id);
//             const itemQuantity = itemInCart
//               ? auth.cartItems.find((cartItem) => cartItem._id === item._id)
//                   .quantity
//               : 0;

//             return (
//               <Grid item key={item._id} xs={12} sm={6} md={3}>
//                 <Card
//                   className="products"
//                   style={{
//                     background: "#ffffff98",
//                     maxWidth: 345,
//                     padding: "1em 1em 0 1em",
//                     margin: "1em 1em 1em 1em",
//                     height: cardHeight,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <CardMedia
//                     className="prodPic"
//                     component="img"
//                     style={{
//                       height: 250,
//                       objectFit: "contain",
//                       borderRadius: "1rem",
//                     }}
//                     image={item.image}
//                     title={item.name}
//                     object-fit="contained"
//                   />
//                   <CardContent>
//                     <Typography
//                       align="center"
//                       gutterBottom
//                       variant="h5"
//                       component="div"
//                     >
//                       {item.name}
//                     </Typography>
//                     <Typography
//                       align="center"
//                       variant="h6"
//                       style={{
//                         color: item.countInStock > 0 ? "inherit" : "red",
//                       }}
//                     >
//                       {item.countInStock > 0 ? "In stock" : "Out of stock"}
//                     </Typography>
//                     <Typography align="center">
//                       Price : {item.price} $
//                     </Typography>
//                     <Typography align="center">
//                       <Rating
//                         name="read-only"
//                         value={item.rating}
//                         readOnly
//                         precision={0.1}
//                       />
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <ButtonGroup fullWidth>
//                       {itemInCart ? (
//                         <>
//                           <Button
//                             size="small"
//                             onClick={() =>
//                               auth.handleChangeCart(item, "decrement")
//                             }
//                             disabled={itemQuantity == 1}
//                           >
//                             -
//                           </Button>
//                           <Button size="small" disabled>
//                             {itemQuantity}
//                           </Button>
//                           <Button
//                             size="small"
//                             onClick={() =>
//                               auth.handleChangeCart(item, "increment")
//                             }
//                             disabled={itemQuantity >= item.countInStock}
//                           >
//                             +
//                           </Button>
//                           <Button
//                             size="small"
//                             color="error"
//                             onClick={() =>
//                               auth.handleChangeCart(item, "delete")
//                             }
//                           >
//                             <DeleteIcon />
//                           </Button>
//                           <a href={`/products/${item._id}`}>
//                             <Button size="medium">Learn More</Button>
//                           </a>
//                         </>
//                       ) : (
//                         <>
//                           <Button
//                             size="medium"
//                             disabled={item.countInStock === 0}
//                             onClick={() =>
//                               auth.handleChangeCart(item, "increment")
//                             }
//                           >
//                             Add To Cart
//                           </Button>
//                           <a href={`/products/${item._id}`}>
//                             <Button size="medium">Learn More</Button>
//                           </a>
//                         </>
//                       )}
//                     </ButtonGroup>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  AlertTitle,
  ButtonGroup,
  Grid,
  Rating,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Badge,
} from "@mui/material";
import { useAuth } from "../providers/auth_provider";
import { Link } from "react-router-dom"; // Import Link

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useAuth();

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://kzico.runflare.run/product/");
      setData(data);
      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  function getInitialCartItems() {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  }

  const cardHeight = 600;

  const isInCart = (itemId) => {
    return auth.cartItems.some((cartItem) => cartItem._id === itemId);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loadin">
          <span className="loader"></span>
        </div>
      ) : error ? (
        <span className="loadin">
          <Alert severity="error" variant="filled">
            <AlertTitle align="center">Error</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        </span>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => {
            const itemInCart = isInCart(item._id);
            const itemQuantity = itemInCart
              ? auth.cartItems.find((cartItem) => cartItem._id === item._id)
                  .quantity
              : 0;

            return (
              <Grid item key={item._id} xs={12} sm={6} md={3}>
                <Card
                  className="products"
                  style={{
                    background: "#ffffff98",
                    maxWidth: 345,
                    padding: "1em 1em 0 1em",
                    margin: "1em 1em 1em 1em",
                    height: cardHeight,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    className="prodPic"
                    component="img"
                    style={{
                      height: 250,
                      objectFit: "contain",
                      borderRadius: "1rem",
                    }}
                    image={item.image}
                    title={item.name}
                    object-fit="contained"
                  />
                  <CardContent>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                      style={{
                        color: item.countInStock > 0 ? "inherit" : "red",
                      }}
                    >
                      {item.countInStock > 0 ? "In stock" : "Out of stock"}
                    </Typography>
                    <Typography align="center">
                      Price: {item.price} $
                    </Typography>
                    <Typography align="center">
                      <Rating
                        name="read-only"
                        value={item.rating}
                        readOnly
                        precision={0.1}
                      />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <ButtonGroup fullWidth>
                      {itemInCart ? (
                        <>
                          <Button
                            size="small"
                            onClick={() =>
                              auth.handleChangeCart(item, "decrement")
                            }
                            disabled={itemQuantity === 1}
                          >
                            -
                          </Button>
                          <Button size="small" disabled>
                            {itemQuantity}
                          </Button>
                          <Button
                            size="small"
                            onClick={() =>
                              auth.handleChangeCart(item, "increment")
                            }
                            disabled={itemQuantity >= item.countInStock}
                          >
                            +
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            onClick={() =>
                              auth.handleChangeCart(item, "delete")
                            }
                          >
                            <DeleteIcon />
                          </Button>
                          <Link to={`/products/${item._id}`}>
                            <Button size="medium">Learn More</Button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Button
                            size="medium"
                            disabled={item.countInStock === 0}
                            onClick={() =>
                              auth.handleChangeCart(item, "increment")
                            }
                          >
                            Add To Cart
                          </Button>
                          <Link to={`/products/${item._id}`}>
                            <Button size="medium">Learn More</Button>
                          </Link>
                        </>
                      )}
                    </ButtonGroup>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Home;
