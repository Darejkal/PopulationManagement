import { useNavigate } from "react-router-dom";
import { ListedView } from "../component/ListedView";
import { useEffect, useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { userService } from "../redux/service/userService";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

let data;
const Profiles = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(null);
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        data = await userService.getProfiles();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error.message);
      }
    };

    fetchProfiles();
  }, []);

  const content = profiles ? (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h4">Thông tin cá nhân</Typography>
      </Box>
      <TableContainer
        sx={{
          padding: "2rem 5rem",
          width: "100%",
          height: "100%",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <PersonIcon sx={{ mr: 1, mb: 0.5 }} />
                Tên :
              </TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ fontWeight: "bold", mr: 3 }}>
                  {profiles.firstName} {profiles.lastname}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <EmailIcon sx={{ mr: 1, mb: 0.5 }} />
                Email :
              </TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ fontWeight: "bold", mr: 3 }}>
                  {profiles.email}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <HomeIcon sx={{ mr: 1, mb: 0.5 }} />
                Địa chỉ :
              </TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ fontWeight: "bold", mr: 3 }}>
                  {profiles.address}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <PhoneIcon sx={{ mr: 1, mb: 0.5 }} />
                Số điện thoại :
              </TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ fontWeight: "bold", mr: 3 }}>
                  {profiles.phoneNumber}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                <HomeIcon sx={{ mr: 1, mb: 0.5 }} />
                Chức vụ :
              </TableCell>
              <TableCell align="center">
                <Box component="span" sx={{ fontWeight: "bold", mr: 3 }}>
                  {profiles.position}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : null;

  return <ListedView children={content}></ListedView>;
};

export default Profiles;
