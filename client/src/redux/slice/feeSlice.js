
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {feeService} from "../services/feeService";


export const getAllFees = createAsyncThunk(
    'fees',
    async (thunkAPI) => {
        try {
            return await feeService.getAllFees();
        } catch (error) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

const feesState = {
    fees: [],
    status: "",
}


export const feeSlice = createSlice({
    name: 'fees',
    initialState: feesState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllFees.pending, (state) => {
            state.status = "loading";
        }).addCase(getAllFees.fulfilled, (state, action) => {
            state.fees = action.payload;
            state.status = "Successful";
        }).addCase(getAllFees.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
})

export default feeSlice.reducer;