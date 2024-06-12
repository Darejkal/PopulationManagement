
import axios from "axios";
import {base_url, config} from "../../utils/config";


const login = async (userData:{email:string,password:string}) => {
    try {
        const response = await axios.post(`${base_url}auth/login`, userData);
        if (response.data?.token) {
            localStorage.setItem("user", JSON.stringify(response.data.currentUser));
            localStorage.setItem("token", response.data.token);
            return response.data;
        } else {
            alert("Sai thông tin tài khoản, vui lòng nhập lại  ")
        }

    } catch (e:any) {
        alert("Sai thông tin tài khoản, vui lòng nhập lại  ")
        throw new Error(e.message);
    }
}

const logout = async () => {
    try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    } catch (error:any) {
        throw new Error(error.message);
    }
}
const changePassword=async (userData:{email:string,firstname:string,lastname:string,phoneNumber:string,sex:string,position:string})=>{
    try{
        const response = await axios.post(`${base_url}auth/changePassword`,userData,config());
    }
    catch (e:any) {
        alert("Sai thông tin tài khoản, vui lòng nhập lại  ")
        throw new Error(e.message);
    }


}

export const userService = {
    login,
    logout,
    changePassword
}