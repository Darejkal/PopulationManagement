
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {feeService} from "../service/feeService";


export const getAllFees = createAsyncThunk(
    'fee',
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
    name: 'fee',
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