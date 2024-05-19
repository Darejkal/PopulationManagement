
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlice"
// import feeReducer from "../redux/slice/feeSlice"
// import contributionReducer from "./slice/contributionSlice";
// import householdReducer from "./slice/householdSlice";
// import  listReducer from "./slice/listSlice";
// import statisticReducer from "./slice/statisticSlice";

export  const store=configureStore({
    reducer:{
        user: userReducer,
        // fee: feeReducer,
        // contribution:contributionReducer,
        // household: householdReducer,
        // list:listReducer,
        // statistic: statisticReducer,
    }
});


