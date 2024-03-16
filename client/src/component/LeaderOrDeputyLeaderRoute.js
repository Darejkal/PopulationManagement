import {Navigate} from "react-router-dom";

export const LeaderOrDeputyLeaderRoute = ({element}) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('user')).role;
    return !(isAuthenticated==="Leader" ||isAuthenticated==="DeputyLeader")? (element) : <Navigate to="/login" replace={true}/>
}