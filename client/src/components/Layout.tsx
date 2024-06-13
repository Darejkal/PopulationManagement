import * as React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { AdminWrap } from "../middleware/PrivateRoute";
import { useNavigate } from "react-router-dom";

export default function Layout({
	content,
	children,
}: {
	content?: React.ReactNode;
	children?: React.ReactNode;
}) {
	const navigate = useNavigate();

	return (
		<div
			style={{
				minHeight: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Navbar
				collapseOnSelect
				bg="dark"
				variant="dark"
				expand="lg"
				style={{ position: "absolute", width: "100%", top: 0, zIndex: 1000 }}
			>
				<Container>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Navbar.Brand href="/dashboard">Bluemoon</Navbar.Brand>

						<Nav className="me-auto">
							<AdminWrap
								element={
									<NavDropdown title="Quản lý người dùng" id="user-dropdown">
										<NavDropdown.Item onClick={() => navigate("/identity/get")}>
											Xem người dùng
										</NavDropdown.Item>
										<NavDropdown.Item
											onClick={() => navigate("/identity/create")}
										>
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
											onClick={() => navigate("/household/manage")}
										>
											Tạo hộ khẩu
										</NavDropdown.Item>
									</NavDropdown>
								}
								nelement={<></>}
							/>
							<NavDropdown title="Phí và đóng góp" id="contribution-dropdown">
								<NavDropdown.Item onClick={() => navigate("/statistics/fee")}>
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
							<NavDropdown
								title={
									JSON.parse(localStorage.getItem("user"))?.email ?? "User"
								}
							>
								<NavDropdown.Item onClick={()=>{
									localStorage.clear();
									navigate("/login")
								}}>Đăng xuất</NavDropdown.Item>
								<NavDropdown.Item href="/identity/changepass">
									Đổi mật khẩu
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div
				style={{
					padding: "5rem 10rem 0 10rem",
					height: "100%",
					width: "100%",
					flex: 1,
				}}
			>
				{children ?? content}
			</div>
		</div>
	);
}
