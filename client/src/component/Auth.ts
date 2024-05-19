import { useEffect, useState } from "react";
import {Navigate, Route} from "react-router-dom";
import {isAdmin} from "../redux/slice/userSlice"
import {useDispatch} from "react-redux";
export const Auth = ({element,checkAdmin}) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user'));
    const dispatch=useDispatch();
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
        if (checkAdmin){
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
    return (
       isAuthenticated && isAdmin? element : <Navigate to="/signin" replace={true} />
    )
}   
export const AdminWrap = ({element}) => {
    return <Auth element={element} checkAdmin={true}/>
}     