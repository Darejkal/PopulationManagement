import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../redux/slice/userSlice";
import { ListedView } from "../component/ListedView";

export default function UpdateProfile() {
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = localStorage.getItem("user");
    const value = {
      email: user.email,
      firstName: data.get("firstName"),
      lastname: data.get("lastName"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
    };
    dispatch(updateProfile(value))
      .unwrap()
      .then(() => {
        navigate("/profiles");
      })
      .catch((error) => {
        console.log("Update profile error:", error);
      });
  };

  const content = (
    <Box
      sx={{
        backgroundColor: "white",
        paddingTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đổi thông tin cá nhân
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="phoneNumber"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cập nhật thông tin
        </Button>
        <Grid container></Grid>
      </Box>
    </Box>
  );
  return <ListedView children={content}></ListedView>;
}
