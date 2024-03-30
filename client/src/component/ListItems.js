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
import { AdminWrap } from "../component/Auth";

export default function ListItems() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Accordion>
        <AdminWrap
          e
          element={
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontSize: "15px" }}>Quản lý cán bộ</span>
                  }
                />
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item onClick={() => navigate("/listUser")}>
                    Xem cán bộ
                  </ListGroup.Item>
                  <ListGroup.Item onClick={() => navigate("/addUser")}>
                    Thêm cán bộ
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          }
          nelement={<></>}
        />
        <AdminWrap
            e
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
          e
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
