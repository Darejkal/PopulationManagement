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
import ChangePassword from "./route/ChangePassword";
import UpdateProfile from "./route/UpdateProfiles";
import { Dashboard } from "./route/Dashboard";
import { ROUTE_LIST, SECURITY_LEVEL } from "./utils/config";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Auth><Dashboard /></Auth>}></Route>
				<Route path="/listuser" element={<ListUser />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} /> */}

        <Route path="/profiles" element={<Profiles />}></Route>
        <Route path="/changePassword" element={<ChangePassword />}></Route>
        <Route path="/updateProfile" element={<UpdateProfile />}></Route>
        {ROUTE_LIST.reduce((pre, next) => {
          return pre.concat(next.nodes);
        }, []).map((v) => {
          let vComponent = <>Not Implemented</>;
          if (v.routeComponent) {
            vComponent = <Auth security={v.security}>{v.routeComponent}</Auth>;
          }
          return (
            <Route
              path={v.link}
              element={<ListedView>{vComponent}</ListedView>}
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
