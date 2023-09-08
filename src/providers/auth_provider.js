import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
const LOCAL_STORAGE_USER_TOKEN = "userToken";
export const AuthContext = createContext({
  isLoggedIn: false,
  loading: false,
  user: undefined,
  setUser: (user) => {},
  logout: () => {},
  cartItems: [],
  handleChangeCart: () => {},
  emptyCart: () => {},
  checkToken: () => {},
});
export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) setCartItems(JSON.parse(storedCartItems));
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
      if (token == null || token == undefined) {
        setLoading(false);
        return;
      }
      const response = await axios.get(
        "http://kzico.runflare.run/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200 && response.data.success) {
        setUser(response.data);
        let u = response.data;
        token = u.jwToken;
        setUser(response.data.user);
        setIsLoggedIn(true);
        setLoading(false);
      } else throw response;
    } catch (err) {
      console.log("check token failed", err);
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(undefined);
  };
  useEffect(() => {}, [cartItems]);
  const handleChangeCart = (product, type) => {
    let _cartItems = [...cartItems];
    if (type === "increment") {
      const existingItemIndex = _cartItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        _cartItems[existingItemIndex].quantity += 1;
      } else {
        _cartItems.push({ ...product, quantity: 1 });
      }

      setCartItems([..._cartItems]);

      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify(_cartItems));
    } else if (type === "decrement") {
      const existingItemIndex = _cartItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        if (_cartItems[existingItemIndex].quantity > 1) {
          _cartItems[existingItemIndex].quantity -= 1;
        } else {
          _cartItems.splice(existingItemIndex, 1);
        }

        setCartItems([..._cartItems]);

        localStorage.removeItem("cartItems");
        localStorage.setItem("cartItems", JSON.stringify(_cartItems));
      }
    } else {
      const existingItemIndex = cartItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        cartItems.splice(existingItemIndex, 1);

        setCartItems([...cartItems]);

        localStorage.removeItem("cartItems");
        localStorage.setItem("cartItems", JSON.stringify(_cartItems));
      }
    }
  };

  const value = {
    user: user,
    loading: loading,
    isLoggedIn: isLoggedIn,
    cartItems: cartItems,
    handleChangeCart: (product, type) => handleChangeCart(product, type),
    emptyCart: () => setCartItems([]),
    logout: () => handleLogout(),
    setUser: (user, token) => {
      if (user !== undefined) {
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token);
      } else {
        localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, "");
        setUser(undefined);
      }
    },
    checkToken: () => fetchData(),
  };

  if (loading)
    return (
      <section
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography>Loading user info</Typography>
      </section>
    );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const auth = useAuth();
  if (auth.loading) {
    return (
      <section
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography>Loading user info</Typography>
      </section>
    );
  }
  if (auth.isLoggedIn !== true) {
    return <Navigate to="/login" />;
  }
  return children;
}
