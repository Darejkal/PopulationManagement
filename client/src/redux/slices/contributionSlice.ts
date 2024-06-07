
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {contributionService} from "../services/contributionService";


export const getAllContributions = createAsyncThunk(
    'contributions',
    async (x,thunkAPI) => {
        try {
            return await contributionService.getALlContributions() as IContribution[];
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

const contributionsState:{
    contributions:IContribution[],
    status:string
} = {
    contributions: [],
    status: "",
}


export const contributionSlice = createSlice({
    name: 'contributions',
    initialState: contributionsState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllContributions.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getAllContributions.fulfilled, (state, action) => {
            state.contributions = action.payload??[];
            state.status = "Successful";
            // console.log("aaa");
            // console.log(state.contributions);
        })
        .addCase(getAllContributions.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
})
export type IContributionState = ReturnType<typeof contributionSlice.reducer>
export default contributionSlice.reducer;