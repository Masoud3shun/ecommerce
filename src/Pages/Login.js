import { Button, TextField, Link as RouterLink } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../Handler";
import { useAuth } from "../providers/auth_provider";

const loginApi = "http://kzico.runflare.run/user/login";
const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post(loginApi, {
        email: user.email,
        password: user.password,
      });
      console.log(response.data.user.token);
      if (response.status === 200) {
        auth.setUser(response.data.user, response.data.user.token);
        navigate("/");
      } else throw response;
    } catch (error) {
      setError("Invalid email or password");
    }
  };
  useEffect(() => {
    if (auth.isLoggedIn) navigate("/");
  }, []);

  return (
    <form className="flexcontainer">
      <TextField
        className="flexitem1"
        id="outlined-basic"
        label="Email/Username"
        variant="outlined"
        name="email"
        onChange={(e) => {
          handleChange(e, user, setUser);
        }}
      />
      <TextField
        className="flexitem1"
        id="outlined-password-input"
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        onChange={(e) => {
          handleChange(e, user, setUser);
        }}
      />
      <div>{error && <p>{error}</p>}</div>
      <div className="btns">
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>

        <Link to="/signup" component={RouterLink} underline="none">
          <Button variant="contained">Sign Up</Button>
        </Link>
      </div>
    </form>
  );
};

export default Login;
