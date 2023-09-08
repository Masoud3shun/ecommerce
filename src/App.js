import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProductId from "./Pages/ProductId";
import Profile from "./Pages/Profile";
import ChangeProfile from "./Pages/ChangeProfile";
import ChangePassword from "./Pages/ChangePassword";
import UploadAvatar from "./Pages/UploadAvatar";
import Address from "./Pages/Address";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import OrderId from "./Pages/OrderId";
import { RequireAuth } from "./providers/auth_provider";
import Header from "./Components/Header";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./providers/auth_provider";

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/products/:productId" element={<ProductId />} />
        <Route path="/Cart" element={<Cart />} />
        <Route
          path="/Profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/Setting/ChangeProfile"
          element={
            <RequireAuth>
              <ChangeProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/Setting/ChangePassword"
          element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>
          }
        />
        <Route
          path="/Setting/UploadAvatar"
          element={
            <RequireAuth>
              <UploadAvatar />
            </RequireAuth>
          }
        />
        <Route
          path="/Address"
          element={
            <RequireAuth>
              <Address />
            </RequireAuth>
          }
        />
        <Route
          path="/Checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route
          path="/Orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path="/Orders/:OrderId"
          element={
            <RequireAuth>
              <OrderId />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
