import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { handleChange } from "../Handler";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const passChangeApi = "http://kzico.runflare.run/user/change-password";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const [newPass, setNewPass] = useState({
    OldPassword: "",
    NewPassword: "",
  });

  const [newPassError, setNewPassError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const newpassregex =
    /^(?=.*[!@#$%^&*(),.?\":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

  const req = async () => {
    try {
      if (!newpassregex.test(newPass.NewPassword)) {
        setNewPassError(
          "The new password should contain at least one symbol, one uppercase letter, one lowercase letter, a number, and be at least 8 characters long."
        );
        return;
      }

      const { data } = await axios.put(
        passChangeApi,
        {
          old_password: newPass.OldPassword,
          new_password: newPass.NewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(data);
      setNewPassError("");
      setApiError("");
      setSuccessMessage("Password changed successfully!");
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An error occurred while changing the password.");
      }
    }
  };

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
        Change Password
      </Typography>
      <TextField
        className="flexitem"
        id="outlined-basic"
        label="Old Password"
        type="password"
        name="OldPassword"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, newPass, setNewPass);
        }}
      />
      <TextField
        className="flexitem"
        id="outlined-basic"
        type="password"
        label="New Password"
        name="NewPassword"
        variant="outlined"
        onChange={(e) => {
          handleChange(e, newPass, setNewPass);
          setNewPassError("");
        }}
        onFocus={() => setNewPassError("")}
        onBlur={() => {
          if (!newpassregex.test(newPass.NewPassword)) {
            setNewPassError(
              "The new password should contain at least one symbol, one uppercase letter, one lowercase letter, a number, and be at least 8 characters long."
            );
          }
        }}
        error={Boolean(newPassError)}
        helperText={newPassError}
      />
      <Button variant="contained" onClick={req}>
        Done
      </Button>
      {apiError && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {apiError}
        </Typography>
      )}
      {successMessage && (
        <Typography sx={{ color: "green", textAlign: "center" }}>
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default ChangePassword;
