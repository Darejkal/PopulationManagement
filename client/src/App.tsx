import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { AdminWrap, PrivateRoute } from "./middleware/PrivateRoute";
import FeeAndContributionList from "./pages/GetFeeAndContributionPages/feeAndContributionList";
import CreateHouseholdFeeList from "./pages/GetFeeAndContributionPages/CreateHouseholdFeeList";
import FeeHouseholdList from "./pages/GetFeeAndContributionPages/FeeHouseholdList";
import Statistic from "./pages/statistic/Statistic";
import UserManagement from "./pages/user/UserManage";
import UserAdd from "./pages/user/UserAdd";
import CreatedList from "./pages/GetFeeAndContributionPages/CreatedList";
import CreateHouseholdContributionList from "./pages/GetFeeAndContributionPages/CreateHouseholdContributionList";
import ContributionHouseholdList from "./pages/GetFeeAndContributionPages/ContributionHouseholdList";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          ></Route>
          {/*get fee and contribution management*/}
          <Route
            path="/GetFACMana"
            element={<PrivateRoute element={<FeeAndContributionList />} />}
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
            path="/CreateHH"
            element={<PrivateRoute element={<CreateHousehold />} />}
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
            path="/changePassword"
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
            path="/GetFACMana"
            element={<PrivateRoute element={<FeeAndContributionList />} />}
          ></Route>
          <Route
            path="/GetUserMana"
            element={<AdminWrap element={<UserManagement />} />}
          ></Route>
          <Route
            path="/AddUser"
            element={<AdminWrap element={<UserAdd />} />}
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
