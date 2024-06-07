import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statisticService } from "../services/statisticService";

export const getFee = createAsyncThunk(
    'getFee',
    async (x,thunkAPI) => {
        try {
            return await statisticService.getFee();
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const getStatistics=createAsyncThunk(
    'getStatistics',
    async (x,thunkAPI) => {
        try {
            return await statisticService.getStatics();
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.message);
        }
    }

)
const staticState:{
    fees:IFee[],
    status:string,
    statics:any,
    contributions?:IContribution[]
} = {
    fees: [],
    status: "",
    statics:undefined
}


const statisticSlice = createSlice({
    name: "Statistic",
    initialState: staticState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFee.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getFee.fulfilled, (state, action) => {
            state.contributions = action.payload;
            state.status = "Successful";
        })
        .addCase(getFee.rejected, (state, action) => {
            state.status = "Fail";
        })
            .addCase(getStatistics.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getStatistics.fulfilled, (state, action) => {
                state.statics = action.payload;
                state.status = "Successful";
            })
            .addCase(getStatistics.rejected, (state, action) => {
                state.status = "Fail";
            })
    }
})
export type IStatisticState= ReturnType<typeof statisticSlice.reducer>
export default statisticSlice.reducer;
