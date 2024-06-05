import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { feeService } from "../service/feeService";

// Async thunk for getting all fees
export const getAllFees = createAsyncThunk(
  'fee/getAllFees',
  async (_, thunkAPI) => {
    try {
      return await feeService.getAllFees;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a fee
export const createFee = createAsyncThunk(
  'fee/createFee',
  async (feeData, thunkAPI) => {
    try {
      return await feeService.createFee(feeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a fee
export const updateFee = createAsyncThunk(
  'fee/updateFee',
  async ({ id, data }, thunkAPI) => {
    try {
      return await feeService.updateFee(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a fee
export const deleteFee = createAsyncThunk(
  'fee/deleteFee',
  async (id, thunkAPI) => {
    try {
      return await feeService.deleteFee(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const feesState = {
  fees: [],
  status: "",
};

export const feeSlice = createSlice({
  name: 'fee',
  initialState: feesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllFees cases
      .addCase(getAllFees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFees.fulfilled, (state, action) => {
        state.fees = action.payload;
        state.status = "successful";
      })
      .addCase(getAllFees.rejected, (state, action) => {
        state.status = "failed";
      })
      // Handle createFee cases
      .addCase(createFee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFee.fulfilled, (state, action) => {
        state.fees.push(action.payload);
        state.status = "successful";
      })
      .addCase(createFee.rejected, (state, action) => {
        state.status = "failed";
      })
      // Handle updateFee cases
      .addCase(updateFee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFee.fulfilled, (state, action) => {
        const index = state.fees.findIndex(fee => fee.id === action.payload.id);
        if (index !== -1) {
          state.fees[index] = action.payload;
        }
        state.status = "successful";
      })
      .addCase(updateFee.rejected, (state, action) => {
        state.status = "failed";
      })
      // Handle deleteFee cases
      .addCase(deleteFee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFee.fulfilled, (state, action) => {
        state.fees = state.fees.filter(fee => fee.id !== action.payload.id);
        state.status = "successful";
      })
      .addCase(deleteFee.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default feeSlice.reducer;
