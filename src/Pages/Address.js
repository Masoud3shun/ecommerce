import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Address = () => {
  const [adrs, setAdrs] = useState({
    City: "",
    Address: "",
    PostalCode: "",
    PhoneNumber: "",
  });
  const [errors, setErrors] = useState({
    City: false,
    Address: false,
    PostalCode: false,
    PhoneNumber: false,
  });

  useEffect(() => {
    const savedAdrs = localStorage.getItem("shippingAddress");
    if (savedAdrs) {
      setAdrs(JSON.parse(savedAdrs));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdrs((prevAdrs) => ({ ...prevAdrs, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "City":
        setErrors((prevErrors) => ({
          ...prevErrors,
          City: !cityRegex.test(value),
        }));
        break;
      case "Address":
        setErrors((prevErrors) => ({
          ...prevErrors,
          Address: !addressRegex.test(value),
        }));
        break;
      case "PostalCode":
        setErrors((prevErrors) => ({
          ...prevErrors,
          PostalCode: !postalCodeRegex.test(value),
        }));
        break;
      case "PhoneNumber":
        setErrors((prevErrors) => ({
          ...prevErrors,
          PhoneNumber: !mobileRegex.test(value),
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(adrs));
    document.getElementById("addressForm").submit();
  };

  const isAnyFieldEmpty = Object.values(adrs).some(
    (value) => value.trim() === ""
  );
  const isAnyFieldInvalid = Object.values(errors).some((error) => error);
  const { cityRegex, addressRegex, postalCodeRegex, mobileRegex } = {
    cityRegex: /^[A-Za-z\s]+$/,
    addressRegex: /^[A-Za-z0-9\s]{10,}$/,
    postalCodeRegex: /^[0-9]{10}$/,
    mobileRegex: /^(\+98|0)?9\d{9}$/,
  };

  return (
    <form
      id="addressForm"
      className="flexcontainer"
      onSubmit={handleSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      action="/Checkout"
    >
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        Shipping Address
      </Typography>
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="City"
        name="City"
        variant="outlined"
        value={adrs.City}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.City}
        helperText={errors.City && "City can only contain letters."}
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Address"
        name="Address"
        variant="outlined"
        value={adrs.Address}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.Address}
        helperText={
          errors.Address &&
          "Address must be at least 10 characters long and contain only letters and numbers."
        }
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Postal Code"
        name="PostalCode"
        type="number"
        variant="outlined"
        value={adrs.PostalCode}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.PostalCode}
        helperText={
          errors.PostalCode &&
          "Postal code must be 10 characters long and contain only numbers."
        }
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Phone Number"
        name="PhoneNumber"
        type="number"
        variant="outlined"
        value={adrs.PhoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        error={errors.PhoneNumber}
        helperText={errors.PhoneNumber && "Enter a valid phone number."}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={isAnyFieldEmpty || isAnyFieldInvalid}
      >
        Next
      </Button>
    </form>
  );
};

export default Address;
