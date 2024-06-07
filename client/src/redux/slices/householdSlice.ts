
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {householdService} from "../services/householdService";


export const getHouseholdsBasedOnParams = createAsyncThunk(
    'householdFeeList',
    async (params:{ area: string; memberNumber: string | number }, thunkAPI) => {
        try {

            return await householdService.getHouseholdsBasedOnParams(params);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)

export const getHouseholds=createAsyncThunk(
    'householdList',
    async (x,thunkAPI)=>{
        try{
            return await householdService.getHouseholds();
        }catch (error:any){
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)
export const getHouseholdDetail=createAsyncThunk(
    'householdDetail',
    async (id:string,thunkAPI)=>{
        try{
            console.log('zzzzz');
            return await householdService.getHouseholdDetail(id);
        }catch (error:any){
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)




const householdState:{
    households:IHousehold[],status:string,
    householdDetail?:Omit<IHousehold, "owner"> & {
        owner: IIndividual;
    }
} = {
    households: [],
    status: "",
}

export const householdSlice = createSlice({
    name: "households",
    initialState: householdState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHouseholdsBasedOnParams.pending, (state) => {
            state.status = "loading";
        }).addCase(getHouseholdsBasedOnParams.fulfilled, (state, action) => {
            state.households = action.payload;
            state.status = "Successful";
        }).addCase(getHouseholdsBasedOnParams.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(getHouseholds.pending, (state) => {
            state.status = "loading";
        }).addCase(getHouseholds.fulfilled, (state, action) => {
            state.households = action.payload;
            state.status = "Successful";
        }).addCase(getHouseholds.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(getHouseholdDetail.pending, (state) => {
            state.status = "loading";
        }).addCase(getHouseholdDetail.fulfilled, (state, action) => {
            state.householdDetail = action.payload;
            state.status = "Successful";
        }).addCase(getHouseholdDetail.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
});
export type IHouseholdSlice = ReturnType<typeof householdSlice.reducer>

export default householdSlice.reducer;