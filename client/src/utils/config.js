import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { Dashboard } from "../route/Dashboard";
import  FeeRecurring from "../component/FeeManager/FeeRecurring";
import { ListUser } from "../route/ListUser";
import { UserFeedback } from "../route/UserFeedback";
import { UserInfo } from "../route/UserInfo";
import SignIn from "../route/SignIn";
import SignUp from "../route/SignUp";
export const base_url = "http://localhost:5000/api/";

export const config = () => {
	return {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
			Accept: "application/json",
		},
	};
};
export const SECURITY_LEVEL = {
	USER: "user",
	ADMIN: "admin",
	GUEST: null,
};

export const ROUTE_LIST = [
	{
		title: "Authenticate",
		icon: null,
		hiddenFromNavList:true,
		security: SECURITY_LEVEL.GUEST,
		nodes: [
			{
				title: "Đăng nhập",
				link: "/signin",
				routeComponent: <SignIn />,
				security: SECURITY_LEVEL.GUEST,
			},
			{
				title: "Đăng ký",
				link: "/signup",
				routeComponent: <SignUp />,
				security: SECURITY_LEVEL.GUEST,
			},
		],
	},
	{
		title: "Trang chủ",
		icon: <DashboardIcon />,
		security: SECURITY_LEVEL.USER,
		nodes: [
			{
				title: "Về trang chủ",
				link: "/",
				routeComponent: <Dashboard />,
				security: SECURITY_LEVEL.USER,
			},
		],
	},
	{
		title: "Quản lý cán bộ",
		icon: <ShoppingCartIcon />,
		security: SECURITY_LEVEL.ADMIN,
		nodes: [
			{
				title: "Xem cán bộ",
				link: "/listadmin",
				security: SECURITY_LEVEL.ADMIN,
			},
			{
				title: "Thêm cán bộ",
				link: "/addadmin",
				security: SECURITY_LEVEL.ADMIN,
			},
		],
	},
	{
		title: "Quản lý khoản phí",
		icon: <BarChartIcon />,
		security: SECURITY_LEVEL.USER,
		nodes: [
			{
				title: "Xem khoản phí",
				link: "/listfee",
				security: SECURITY_LEVEL.USER,
				routeComponent: <FeeRecurring />,
			},
			{
				title: "Thêm khoản phí",
				link: "/addfee",
				security: SECURITY_LEVEL.ADMIN,
			},
		],
	},
	{
		title: "Quản lý hộ khẩu",
		icon: <LayersIcon />,
		security: SECURITY_LEVEL.ADMIN,
		nodes: [
			{
				title: "Xem hộ khẩu",
				link: "/listfamily",
				security: SECURITY_LEVEL.ADMIN,
			},
			{
				title: "Thêm hộ khẩu",
				link: "/addfamily",
				security: SECURITY_LEVEL.ADMIN,
			},
		],
	},
	{
		title: "Tra cứu",
		icon: <SearchIcon />,
		security: SECURITY_LEVEL.USER,
		nodes: [
			{ title: "Tra cứu", link: "/search", security: SECURITY_LEVEL.USER },
		],
	},
	{
		title: "Quản lý thông tin",
		icon: <PeopleIcon />,
		security: SECURITY_LEVEL.USER,
		nodes: [
			{
				title: "Xem thông tin cá nhân",
				link: "/user/info",
				security: SECURITY_LEVEL.USER,
				routeComponent: <UserInfo />,
			},
			{
				title: "Điền khiếu nại",
				link: "/user/feedback",
				security: SECURITY_LEVEL.USER,
				routeComponent: <UserFeedback />,
			},
			{
				title: "Xem danh sách cá nhân",
				link: "/listuser",
				routeComponent: <ListUser />,
				security: SECURITY_LEVEL.USER,
			},
		],
	},
];
