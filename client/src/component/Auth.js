import {Navigate, Route} from "react-router-dom";

export const Auth = ({element}) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user'))?true:false;
    return (
       isAuthenticated ? element : <Navigate to="/signin" replace={true} />
    )
}    