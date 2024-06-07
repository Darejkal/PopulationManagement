import React from "react";
import {Navigate} from "react-router-dom";

export const isAdmin = ({element}:{element:React.JSX.Element}) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user')??'').role;
    return !(isAuthenticated==="Admin")? (element) : <Navigate to="/login" replace={true}/>
}