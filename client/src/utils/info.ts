const createInfo = (
	name,
	label,
	default_val = undefined,
	type = "text",
	vals = [],
	required=true
) => {
	return {
		name: name,
		label: label,
		type: type,
		vals: vals,
		default_val: default_val,
		required
	};
};
export const userInfos = [
	createInfo("email", "Email", "", "email"),
	createInfo("password", "Mật khẩu", "", "password"),
	createInfo("firstname", "Tên", ""),
	createInfo("lastname", "Họ", ""),
	createInfo("phoneNumber", "SĐT", ""),
	createInfo("sex", "Giới", ""),
	createInfo("household", "Số phòng", "","",[],false),
	createInfo("CCCD", "CCCD", ""),
	createInfo("hokhau", "Hộ Khẩu", "","",[],false),
	createInfo("status", "Tình trạng", "","text",["Cư dân","Tạm trú","Tạm vắng","Người Dùng"]),
	createInfo("position", "Chức danh", "", "text", ["Admin", "User"]),
];