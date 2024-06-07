import axios from "axios";
import {base_url,config} from "../../utils/config";

const listUser = async () => {
    try {
        const {data}:{data:{users:{email:string,firstname:string,lastname:string}[]}} = await axios.get(`${base_url}canbo/list`,config());
        if (data) {
            return data;
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi truy cập danh sách cán bộ")
        throw new Error(e?.message);
    }
}
const getUserByEmail = async (email:string) => {
    try {
        const response = await axios.post(`${base_url}canbo/get`,{"email":email},config());
        if (response?.data) {
            return response.data as {user:{email:string,firstName:string,lastname:string,phoneNumber:string,sex:string,role:string,position:string},message:string};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi tìm kiếm cán bộ")
        throw new Error(e?.message);
    }
}
const createUser = async (userData:{email:string,firstName:string,password:string,lastname:string,phoneNumber:string,sex:string,role:string,position:string}) => {
    try {
        const response = await axios.post(`${base_url}canbo/create`,userData,config());
        if (response.data) {
            return response.data as {user:{email:string,firstName:string,lastname:string,phoneNumber:string,sex:string,role:string,position:string}};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi thêm cán bộ")
        throw new Error(e?.message);
    }
}
const deleteUserByEmail = async (email:string) => {
    try {
        const response = await axios.post(`${base_url}canbo/delete`,{"email":email},config());
        if (response.data) {
            return response.data as {message:string};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi xóa cán bộ")
        throw new Error(e?.message);
    }
}
const isAdmin = async () => {
    try {
        const response:{data:string} = await axios.get(`${base_url}canbo/check`,config());
        if (response) {
            return true
        }
    } catch(e:any) {
        return false
    }
}

const userService = {
    listUser,
    getUserByEmail,
    createUser,
    deleteUserByEmail,
    isAdmin
}
export default userService