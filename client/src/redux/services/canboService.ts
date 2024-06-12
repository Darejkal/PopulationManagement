import axios from "axios";
import {base_url,config} from "../../utils/config";

const listUser = async () => {
    try {
        const {data}:{data:{users:Omit<IUser,"password">[]}} = await axios.get(`${base_url}user/list`,config());
        if (data) {
            return data;
        } else {
            throw new Error("Sai câu trả lời");
        }

    } catch (e:any) {
        alert("Lỗi truy cập danh sách người dùng")
        throw new Error(e?.message);
    }
}
const getUserByEmail = async (email:string) => {
    try {
        const response = await axios.post(`${base_url}user/get`,{"email":email},config());
        if (response?.data) {
            return response.data as {user:{email:string,firstname:string,lastname:string,phoneNumber:string,sex:string,position:string},message:string};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi tìm kiếm người dùng")
        throw new Error(e?.message);
    }
}
const createUser = async (userData:{email:string,firstname:string,password:string,lastname:string,phoneNumber:string,sex:string,position:string}) => {
    try {
        const response = await axios.post(`${base_url}user/create`,userData,config());
        if (response.data) {
            return response.data as {user:{email:string,firstname:string,lastname:string,phoneNumber:string,sex:string,position:string}};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi thêm người dùng")
        throw new Error(e?.message);
    }
}
const deleteUserByEmail = async (email:string) => {
    try {
        const response = await axios.post(`${base_url}user/delete`,{"email":email},config());
        if (response.data) {
            return response.data as {message:string};
        } else {
            throw new Error("Sai Response");
        }

    } catch (e:any) {
        alert("Lỗi xóa người dùng")
        throw new Error(e?.message);
    }
}
const isAdmin = async () => {
    try {
        const response:{data:string} = await axios.get(`${base_url}user/check`,config());
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
    isAdmin,
    updateUserByEmail:async (props:{userData:IUser,oldemail:string})=>{
        try {
            const response:{data:string} = await axios.post(`${base_url}user/update`,props,config());
            if (response) {
                return true
            }
        } catch(e:any) {
            return false
        }
    }
}
export default userService