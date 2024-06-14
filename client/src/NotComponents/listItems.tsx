import * as React from "react";

import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Accordion, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AdminWrap } from "../middleware/PrivateRoute";

export default function MainListItems() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Accordion>
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do */}
        <AdminWrap
          element={
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "15px" }}>Quản lý người dùng</span>
                  }
                />
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item onClick={() => navigate("/GetCANBOMana")}>
                    Xem người dùng
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => navigate("/AddCANBO")}>
                    Thêm người dùng
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          }
          nelement={<></>}
        />
        <AdminWrap
            element={
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText
                      primary={
                        <span style={{ fontSize: "15px" }}>Quản lý khoản phí</span>
                      }
                  />
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item onClick={() => navigate("/fee-recurring")}>
                      Phí thu
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => navigate("/fee-contribution")}>
                      Đóng góp
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            }
            nelement={<></>}
        />

        <AdminWrap
          element={
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "15px" }}>Quản lý hộ khẩu</span>
                  }
                />
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item
                    onClick={() => {
                      navigate("/HouseholdList");
                    }}
                  >
                    Xem danh sách hộ khẩu
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          }
          nelement={<></>}
        />
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText
              primary={<span style={{ fontSize: "15px" }}>Phí và đóng góp</span>}
            />
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item
                onClick={() => {
                  navigate("/GetFACMana");
                }}
              >
                Lập danh sách
              </ListGroup.Item>
              <ListGroup.Item onClick={() => navigate("/CreatedList")}>
                Xem danh sách
              </ListGroup.Item>
              <ListGroup.Item onClick={() => navigate("/GetStatistic")}>
                Thống kê
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </React.Fragment>
  );
}
