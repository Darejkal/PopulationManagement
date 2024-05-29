import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, loginUser } from "../redux/slice/userSlice";
import { ListedView } from "../component/ListedView";

export default function ChangePassword() {
  const defaultTheme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("secondPassword") !== data.get("newPassword")) {
      alert("Thông tin không nhât quán, mời bạn nhập lại");
    } else {
      const value = {
        email: data.get("email"),
        oldPassword: data.get("oldPassword"),
        newPassword: data.get("newPassword"),
      };
      dispatch(changePassword(value))
        .unwrap()
        .then(() => {
          navigate("/singin");
        })
        .catch((error) => {
          console.log("Login error:", error);
        });
    }
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
        Đổi mật khẩu
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="oldPassword"
          label="Mật khẩu cũ"
          type="password"
          id="oldPassword"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="Nhập mật khẩu mới"
          type="password"
          id="newPassword"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="secondPassword"
          label="Nhập lại"
          type="password"
          id="secondPassword"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đổi mật khẩu
        </Button>
        <Grid container></Grid>
      </Box>
    </Box>
  );
  return <ListedView children={content}></ListedView>;
}
