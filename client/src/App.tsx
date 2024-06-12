import "./App.css";

import { BrowserRouter, Navigate, Route, RouteProps, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/DashBoard";
// import {PrivateRoute} from "./route/PrivateRoute";
// import FeeAndContributionList from "./pages/GetFeeAndContributionPages/feeAndContributionList";
// import CreateHouseholdFeeList from "./pages/GetFeeAndContributionPages/CreateHouseholdFeeList";
// import FeeHouseholdList from "./pages/GetFeeAndContributionPages/FeeHouseholdList";
import FeeContribution from "./pages/FeeManager/FeeContribution";
import FeeRecurring from "./pages/FeeManager/FeeRecurring";
import CreateHousehold from "./pages/ManageHouseholdPage/CreateHousehold";
import AddHouseholder from "./Components/AddHouseholder";
import HouseholdList from "./pages/ManageHouseholdPage/HouseholdList";
import PopulationList from "./Components/PopulationList";
import { PrivateRoute, AdminRoute } from "./middleware/PrivateRoute";
import CreateHouseholdFeeList from "./pages/GetFeeAndContributionPages/CreateHouseholdFeeList";
import FeeHouseholdList from "./pages/GetFeeAndContributionPages/FeeHouseholdList";
import Statistic from "./pages/statistic/Statistic";
import CreatedList from "./pages/GetFeeAndContributionPages/CreatedList";
import CreateHouseholdContributionList from "./pages/GetFeeAndContributionPages/CreateHouseholdContributionList";
import ContributionHouseholdList from "./pages/GetFeeAndContributionPages/ContributionHouseholdList";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from "react-toastify";
import HouseholdManage from "./routing/household/manage";
import Layout from "./components/Layout";
import LoginPage from "./routing/public/login";
import CreateUserPage from "./routing/identity/create";
import HouseholdExpandPage from "./routing/household/expand";
import UserManagement from "./routing/identity/get";
import ChangePassword from "./routing/identity/change";
import FeeAndContributionList from "./routing/statistics/fee";
function App() {
  return (
    <>
    <ToastContainer style={{zIndex:2147483647}}/>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          <Route
            path="/HouseholdFeeList/create"
            element={
              <PrivateRoute element={<CreateHouseholdFeeList />}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/HouseholdFeeList/:id"
            element={
              <PrivateRoute element={<FeeHouseholdList />}></PrivateRoute>
            }
          ></Route>

          <Route
            path="/household/manage"
            element={
              <PrivateRoute
                element={<HouseholdManage />}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/household/expand/:id"
            element={
              <PrivateRoute
                element={<HouseholdExpandPage />}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/HouseholdList"
            element={<PrivateRoute element={<HouseholdList />} />}
          ></Route>
          <Route
            path="/CreateHH/AddHHer"
            element={<PrivateRoute element={<AddHouseholder />}></PrivateRoute>}
          ></Route>
          <Route
            path="/PopulationList/:id"
            element={<PrivateRoute element={<PopulationList />}></PrivateRoute>}
          ></Route>
          <Route
            path="/identity/changepass"
            element={<PrivateRoute element={<ChangePassword />} />}
          ></Route>
          <Route
            path="/fee-contribution"
            element={<PrivateRoute element={<FeeContribution />} />}
          ></Route>
          <Route
            path="/fee-recurring"
            element={<PrivateRoute element={<FeeRecurring />} />}
          ></Route>
          {/*get fee and contribution management*/}
          <Route
            path="/statistics/fee"
            element={<PrivateRoute element={<FeeAndContributionList />} />}
          ></Route>
          <Route
            path="/identity/get"
            element={<AdminRoute element={<UserManagement />} />}
          ></Route>
          {/* <Route
            path="/AddUser"
            element={<AdminRoute element={<UserAdd />} />}
          ></Route> */}
          <Route
            path="/identity/create"
            element={<AdminRoute element={<CreateUserPage />} />}
          ></Route>
          <Route
            path="/HouseholdFeeList/create"
            element={
              <PrivateRoute element={<CreateHouseholdFeeList />}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/HouseholdFeeList/:id"
            element={
              <PrivateRoute element={<FeeHouseholdList />}></PrivateRoute>
            }
          ></Route>
          <Route
            path="/GetStatistic"
            element={<PrivateRoute element={<Statistic />} />}
          ></Route>
          <Route
            path="/CreatedList"
            element={<PrivateRoute element={<CreatedList />} />}
          ></Route>
          <Route
            path="/HouseholdContributionList/create"
            element={
              <PrivateRoute
                element={<CreateHouseholdContributionList />}
              ></PrivateRoute>
            }
          ></Route>
          <Route
            path="/HouseholdContributionList/:id"
            element={
              <PrivateRoute
                element={<ContributionHouseholdList />}
              ></PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
