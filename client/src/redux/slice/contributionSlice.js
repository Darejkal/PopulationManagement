
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {contributionService} from "../service/contributionService";


export const getAllContributions = createAsyncThunk(
    'contributions',
    async (thunkAPI) => {
        try {
            return await contributionService.getALlContributions();
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

const contributionsState = {
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
            state.contributions = action.payload;
            state.status = "Successful";
            // console.log("aaa");
            // console.log(state.contributions);
        })
        .addCase(getAllContributions.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
})

export default contributionSlice.reducer;