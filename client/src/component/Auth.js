import { useEffect, useState } from "react";
import {Navigate, Route} from "react-router-dom";
import {isAdmin} from "../redux/slice/userSlice"
import {useDispatch} from "react-redux";
import { SECURITY_LEVEL } from "../utils/config";
export const Auth = ({children,security}) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user'));
    const dispatch=useDispatch();
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
        if (security==SECURITY_LEVEL.ADMIN){
            dispatch(isAdmin())
            .unwrap()
            .then(()=>{
                setFlag(true)
            }).catch((error)=>{
                console.log('Login error:',error)
            })   
        } else{
            setFlag(true)
        }
    },[])
    if(security==SECURITY_LEVEL.GUEST){
        return children
    } else if (security==SECURITY_LEVEL.USER){
        return isAuthenticated ? children : <Navigate to="/signin" replace={true} />
    } else{
        return (
            isAuthenticated && isAdmin? children : <Navigate to="/signin" replace={true} />
        )
    }

}   
export const AdminWrap = ({children}) => {
    return <Auth  security={SECURITY_LEVEL.ADMIN}>{children}</Auth>
}     