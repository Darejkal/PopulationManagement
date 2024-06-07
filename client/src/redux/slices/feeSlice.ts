
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {feeService} from "../services/feeService";


export const getAllFees = createAsyncThunk(
    'fees',
    async (x,thunkAPI) => {
        try {
            return await feeService.getAllFee();
        } catch (error:any) {
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

const feesState:{
    fees:IFee[],
    status:string
} = {
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
            state.fees = action.payload??[];
            state.status = "Successful";
        }).addCase(getAllFees.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
})
export type IFeeSlice = ReturnType<typeof feeSlice.reducer>

export default feeSlice.reducer;