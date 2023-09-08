import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Typography, Paper, Grid } from "@mui/material";
import { useAuth } from "../providers/auth_provider";
const Profile = () => {
  const auth = useAuth();
  console.log(auth);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "90vh", padding: "2rem" }}
    >
      <Grid item>
        <Paper
          className="prof2"
          style={{
            padding: "16px",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Avatar src={auth.user.image} />
          </Stack>
          <Typography variant="h5" className="flexitem1 profcont">
            Email : {auth.user.email}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            Username :{auth.user.username}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            Mobile : {auth.user.mobile}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            First Name : {auth.user.firstname}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            Last Name : {auth.user.lastname}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            Gender : {auth.user.gender}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            Age : {auth.user.age}
          </Typography>
          <Typography variant="h5" className="flexitem1 profcont">
            City : {auth.user.city}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
