
import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MainListItems from './listItems';
import UserDropdown from "./UserDropdown";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { AdminWrap } from '../middleware/PrivateRoute';
import { useNavigate } from 'react-router-dom';

export default function Layout({content,children}:{content?:React.JSX.Element,children?:React.JSX.Element}) {
  const navigate = useNavigate();

    return(
        <div>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg" style={{position:"sticky",zIndex:1000}}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand href="/dashboard">Bluemoon</Navbar.Brand>

            <Nav className="me-auto">
              <AdminWrap
                element={
                  <NavDropdown title="Quản lý người dùng" id="user-dropdown">
                    <NavDropdown.Item onClick={() => navigate("/GetuserMana")}>
                      Xem người dùng
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/Adduser")}>
                      Thêm người dùng
                    </NavDropdown.Item>
                  </NavDropdown>
                }
                nelement={<></>}
              />
              <AdminWrap
                element={
                  <NavDropdown title="Quản lý khoản phí" id="fee-dropdown">
                    <NavDropdown.Item
                      onClick={() => navigate("/fee-recurring")}
                    >
                      Phí thu
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => navigate("/fee-contribution")}
                    >
                      Đóng góp
                    </NavDropdown.Item>
                  </NavDropdown>
                }
                nelement={<></>}
              />
              <AdminWrap
                element={
                  <NavDropdown title="Quản lý hộ khẩu" id="household-dropdown">
                    <NavDropdown.Item
                      onClick={() => navigate("/HouseholdList")}
                    >
                      Xem danh sách hộ khẩu
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => navigate("/CreateHH")}
                    >
                      Tạo hộ khẩu
                    </NavDropdown.Item>
                  </NavDropdown>
                }
                nelement={<></>}
              />
              <NavDropdown title="Phí và đóng góp" id="contribution-dropdown">
                <NavDropdown.Item onClick={() => navigate("/GetFACMana")}>
                  Lập danh sách
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/CreatedList")}>
                  Xem danh sách
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/GetStatistic")}>
                  Thống kê
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
                <UserDropdown></UserDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <div style={{padding:"5rem 10rem"}}>
        {children??content}
        </div>
    </div>
    )
}