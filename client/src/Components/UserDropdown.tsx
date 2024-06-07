
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";
import { ThunkDispatch } from '@reduxjs/toolkit';

function UserNavDropdown() {
    const userState=useSelector(state => state.user);
    const dispatch=useDispatch<ThunkDispatch<any, any, any>>();
    const navigate=useNavigate();
    const handleSignOut=()=>{
        dispatch(logOutUser())
            .unwrap()
            .then(()=>{
                // console.log("sss");
                navigate("/login");
                window.location.reload();
            })
            .catch((error)=>{
                console.log("error");
            })

    }
    const handleChangePassword=()=>{
        navigate("/changePassword");
    }
    return (
        <NavDropdown title={ JSON.parse(localStorage.getItem('user'))?.email??"User"}>
                <NavDropdown.Item  onClick={handleSignOut}>Đăng xuất</NavDropdown.Item>
                <NavDropdown.Item onClick={handleChangePassword} >Đổi mật khẩu</NavDropdown.Item>
        </NavDropdown>
    );
}

export default UserNavDropdown;