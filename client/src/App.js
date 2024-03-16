import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dashboard } from "./route/Dashboard";
import SignIn  from "./route/SignIn";
import SignUp from "./route/SignUp";
import { Auth } from "./component/Auth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth element={<Dashboard />} />}></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
