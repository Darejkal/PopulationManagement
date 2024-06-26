import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { isAdmin } from "../redux/slices/canboSlice";
import React from "react";
import Layout from "../components/Layout";
export const PrivateRoute = ({ element }:{element:ReactNode}) => {
	let isAuthenticated=false;
	try{
		isAuthenticated = JSON.parse(localStorage.getItem("user")??"");
	} catch(e:any){

	}
	return isAuthenticated ? <Layout>{element}</Layout> : <Navigate to="/login" replace={true} />;
};
export const AdminRoute = ({ element, nelement }:{element:React.JSX.Element,nelement?:React.JSX.Element}) => {
	const dispatch = useDispatch<ThunkDispatch<any,any,any>>();
	const [flag, setFlag] = useState(0);
	useEffect(() => {
		dispatch(isAdmin())
			.unwrap()
			.then((v) => {
				if (v === true) {
					setFlag(2);
				} else {
                    setFlag(1)
                }
			});
	}, []);
	if (flag===2) {
		return <Layout>{element}</Layout>;
	} else if (flag===1) {
        return <Layout>{nelement}</Layout> ?? <Navigate to="/" replace={true} />;
    } else {
		return <></>
	}
};

export const AdminWrap = ({ element, nelement }:{element:React.JSX.Element,nelement?:React.JSX.Element}) => {
	const dispatch = useDispatch<ThunkDispatch<any,any,any>>();
	const [flag, setFlag] = useState(0);
	useEffect(() => {
		dispatch(isAdmin())
			.unwrap()
			.then((v) => {
				if (v === true) {
					setFlag(2);
				} else {
                    setFlag(1)
                }
			});
	}, []);
	if (flag===2) {
		return element;
	} else if (flag===1) {
        return nelement ?? <Navigate to="/" replace={true} />;
    } else {
		return <></>
	}
};
