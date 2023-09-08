import { Alert, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth_provider";
const signupApi = "http://kzico.runflare.run/user/signup";

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showAlert, setShowAlart] = useState(false);
  const [err, setErr] = useState("");
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  };
  useEffect(() => {
    if (auth.isLoggedIn) navigate("/");
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters long")
      .max(16, "Username can't be longer than 16 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[!@#$%^&*(),.?\":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must contain at least one symbol, one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^(\+98|0)?9\d{9}$/, "Invalid mobile number"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(signupApi, values);
      if (response.status === 201) {
        setShowAlart(true);
        setTimeout(() => {
          navigate("/Login");
          setShowAlart(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setErr(error.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flexcontainer">
          {showAlert && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Alert severity="success">
                Signup successful! Redirecting to Login page...
              </Alert>
            </div>
          )}

          {!showAlert && (
            <>
              <Field
                as={TextField}
                className="flexitem"
                label="Username"
                variant="outlined"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
              <Field
                as={TextField}
                className="flexitem"
                label="Email"
                variant="outlined"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
              <Field
                as={TextField}
                type="password"
                className="flexitem"
                label="Password"
                variant="outlined"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
              <Field
                as={TextField}
                type="password"
                className="flexitem"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
              <Field
                as={TextField}
                className="flexitem"
                label="Mobile"
                variant="outlined"
                name="mobile"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="error-message"
              />
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Sign Up
              </Button>
              {err && <div className="error-message">{err}</div>}{" "}
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
