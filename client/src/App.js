import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListedView } from "./component/ListedView";
import SignIn from "./route/SignIn";
import SignUp from "./route/SignUp";
import { Auth } from "./component/Auth";
import { ListUser } from "./route/ListUser";
import Profiles from "./route/Profiles";
import { Dashboard } from "./route/Dashboard";
import ChangePassword from "./route/ChangePassword";
import UpdateProfile from "./route/UpdateProfiles";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth element={<Dashboard />} />}></Route>
        <Route path="/listUser" element={<ListUser />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/changeProfile" element={<UpdateProfile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
