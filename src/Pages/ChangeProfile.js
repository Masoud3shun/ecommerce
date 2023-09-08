import React, { useState } from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { handleChange } from "../Handler";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth_provider";

const ChngProfApi = "http://kzico.runflare.run/user/change-profile";
const ChangeProfile = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    City: "",
    GenderU: "",
  });
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const auth = useAuth();
  const firstNameRegex = /^[a-zA-Z\s]+$/;
  const lastNameRegex = /^[a-zA-Z\s]+$/;
  const cityRegex = /^[a-zA-Z]+$/;

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "FirstName" && !firstNameRegex.test(value)) {
      setFirstNameError(
        "Invalid first name. Only letters and space are allowed."
      );
    } else if (name === "LastName" && !lastNameRegex.test(value)) {
      setLastNameError(
        "Invalid last name. Only letters and space are allowed."
      );
    } else if (
      name === "City" &&
      (!cityRegex.test(value) || value.length < 3)
    ) {
      setCityError(
        "Invalid city. Only letters and at least 3 characters are allowed."
      );
    } else if (name === "Age" && (isNaN(value) || value < 15)) {
      setAgeError("Age must be a number and at least 15 years old.");
    } else {
      setFirstNameError("");
      setLastNameError("");
      setCityError("");
      setAgeError("");
    }
  };

  const handleChangeField = (e) => {
    handleChange(e, user, setUser);
    const { name } = e.target;
    if (name === "FirstName") {
      setFirstNameError("");
    } else if (name === "LastName") {
      setLastNameError("");
    } else if (name === "City") {
      setCityError("");
    } else if (name === "Age") {
      setAgeError("");
    }
  };
  const isAnyTextFieldEmpty =
    user.FirstName === "" ||
    user.LastName === "" ||
    user.Age === "" ||
    user.City === "" ||
    user.GenderU === "";

  const req = async () => {
    try {
      const { data } = await axios.put(
        ChngProfApi,
        {
          firstname: user.FirstName,
          lastname: user.LastName,
          gender: user.GenderU,
          age: user.Age,
          city: user.City,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(data);
      auth.checkToken();
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        navigate("/Profile");
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      setApiError(error.response.data.message);
    }
  };
  const isAnyError =
    !!firstNameError || !!lastNameError || !!cityError || !!ageError;

  return (
    <Box
      className="flexcontainer"
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        Change Profile
      </Typography>
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="First Name"
        name="FirstName"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChangeField}
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Last Name"
        name="LastName"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChangeField}
        error={!!lastNameError}
        helperText={lastNameError}
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Age"
        name="Age"
        type="number"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChangeField}
        error={!!ageError}
        helperText={ageError}
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="City"
        name="City"
        variant="outlined"
        onBlur={handleBlur}
        onChange={handleChangeField}
        error={!!cityError}
        helperText={cityError}
      />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="GenderU"
          onChange={handleChangeField}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      {apiError && <Alert severity="error">{apiError}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Button
        variant="contained"
        onClick={req}
        disabled={isAnyTextFieldEmpty || isAnyError}
      >
        Done
      </Button>
    </Box>
  );
};

export default ChangeProfile;
