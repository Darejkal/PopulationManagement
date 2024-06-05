import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userService } from "../redux/service/userService";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Modal,
  Box,
  Grid,
} from "@material-ui/core";
import { ListedView } from "../component/ListedView";
import { updateProfile } from "../redux/slice/userSlice";

let data;
const UserInfoTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching profiles:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = (user) => {
    setSelectedUser(user);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = {
      email: selectedUser.email,
      firstName: data.get("firstName"),
      lastname: data.get("lastName"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
    };
    dispatch(updateProfile(value))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Update profile error:", error);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Tên
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Họ
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                SĐT
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Giới tính
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                Địa chỉ
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                {" "}
                Vai trò
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.sex}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleOpen();
                      handleEditClick(user);
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            height: "70%",
            width: "70%",
            backgroundColor: "white",
            border: "1px solid #656565`",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            onSubmit={handleSubmit}
            component="form"
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Chỉnh sửa thông tin của{" "}
              {selectedUser ? selectedUser.firstName : ""}
            </h2>
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
              color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cập nhật thông tin
            </Button>

            <Grid container></Grid>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export const UserInfo = () => {
  return <UserInfoTable />;
};
