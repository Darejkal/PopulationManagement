
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {listService} from "../services/listService";

export const createFeeList = createAsyncThunk(
    'createFeeList',
    async (params:{
        households?: {
            _id: string;
        }[] | undefined;
        fee_id: string;
        tableName: string;
    }, thunkAPI) => {
        try {
            return await listService.createFeeList(params);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)



export const getFeeHouseholdList = createAsyncThunk(
    'feeHouseholdList',
    async (id:string, thunkAPI) => {
        try {
            // console.log("bgh");
            // console.log(id);
            return await listService.getFeeList(id);
        } catch (error:any) {

            console.log("bghss");
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateFeeList=createAsyncThunk(
    'updateFeeList',
    async (data:IFee[],thunkAPI)=>{
        try{
            return await listService.updateFeeList(data);

        }catch (error:any){
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)

export const getCreatedList=createAsyncThunk(
        'getCreatedList',
    async (data,thunkAPI)=>{
        try{
            return await listService.getCreatedList();

        }catch (error:any){
            return thunkAPI.rejectWithValue(error.message);
        }

    }

)
//-------------------------------------------Contribution----------------------------------------------

export const createContributionList = createAsyncThunk(
    'createContributionList',
    async (params:{ households: { _id: string; }[]; contribution_id: string; tableName?: string; }, thunkAPI) => {
        try {
            return await listService.createContributionList(params);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)

export const deleteList=createAsyncThunk(
    'deleteList',
    async (id:string, thunkAPI) => {
        try {
            return await listService.deleteList(id);
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }

)
export const getContributionHouseholdList = createAsyncThunk(
    'contributionHouseholdList',
    async (id:string, thunkAPI) => {
        try {

            return await listService.getContributionList(id);
        } catch (error:any) {


            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateContributionList=createAsyncThunk(
    'updateContributionList',
    async (data:{
        changedContributionList: {
            amount?: number | undefined;
            paymentTime?: Date | undefined;
            _id: string;
        }[];
    },thunkAPI)=>{
        try{
            return await listService.updateContributionList(data);

        }catch (error:any){
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)
//---------------------------------------listSlice---------------------------------------------------
const listState:{
    feeLists:IFeeHouseholdRelPopulated[],
    feeList?:IFeeHouseholdRelPopulated,
    contriLists:IContributionHouseholdRelPopulated[],
    status:string
} = {
    feeLists: [],
    contriLists: [],
    status: ""
}
export const listSlice = createSlice({
    name: 'lists',
    initialState: listState,
    reducers: {
        updateStatus: (state, action) => {
            const index = state.feeLists.findIndex((feeHousehold) => feeHousehold._id === action.payload.id);
            state.feeLists[index].status = action.payload.status;
        },
        updateDate: (state, action) => {
            const index = state.feeLists.findIndex((feeHousehold) => feeHousehold._id === action.payload.id);

            state.feeLists[index].paymentTime = action.payload.date;
        },
        updateContributionDate: (state, action) => {
            const index = state.contriLists.findIndex((contributionHousehold) => contributionHousehold._id === action.payload.id);

            state.contriLists[index].paymentTime = action.payload.date;
        },
        updateContributionAmount: (state, action) => {
            const index = state.contriLists.findIndex((contributionHousehold) => contributionHousehold._id === action.payload.id);

            state.contriLists[index].amount = action.payload.amount;
        },

    },
    extraReducers: (builder) => {
        builder
            //Fee
            .addCase(createFeeList.pending, (state) => {
                state.status = "loading";
            }).addCase(createFeeList.fulfilled, (state, action) => {
            state.feeLists = action.payload;
            state.status = "Successful";
        }).addCase(createFeeList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(getFeeHouseholdList.pending, (state) => {
            state.status = "loading";
        }).addCase(getFeeHouseholdList.fulfilled, (state, action) => {
            state.feeList = action.payload;
            state.status = "Successful";
        }).addCase(getFeeHouseholdList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(updateFeeList.pending, (state) => {
            state.status = "loading";
        }).addCase(updateFeeList.fulfilled, (state, action) => {
            state.status = "Successful";
        }).addCase(updateFeeList.rejected, (state, action) => {
            state.status = "Fail";
        })
            // Contribution
            .addCase(createContributionList.pending, (state) => {
            state.status = "loading";
        }).addCase(createContributionList.fulfilled, (state, action) => {
            state.contriLists = action.payload;
            state.status = "Successful";
        }).addCase(createContributionList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(getContributionHouseholdList.pending, (state) => {
            state.status = "loading";
        }).addCase(getContributionHouseholdList.fulfilled, (state, action) => {
            state.contriLists = action.payload;
            state.status = "Successful";
        }).addCase(getContributionHouseholdList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(updateContributionList.pending, (state) => {
            state.status = "loading";
        }).addCase(updateContributionList.fulfilled, (state, action) => {
            state.status = "Successful";
        }).addCase(updateContributionList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(getCreatedList.pending, (state) => {
            state.status = "loading";
        }).addCase(getCreatedList.fulfilled, (state, action) => {
            state.feeList=action.payload;
            state.status = "Successful";
        }).addCase(getCreatedList.rejected, (state, action) => {
            state.status = "Fail";
        }).addCase(deleteList.pending, (state) => {
            state.status = "loading";
        }).addCase(deleteList.fulfilled, (state, action) => {
            state.status = "Successful";
        }).addCase(deleteList.rejected, (state, action) => {
            state.status = "Fail";
        })
    }
})
export const {updateStatus, updateDate,updateContributionAmount,updateContributionDate} = listSlice.actions;
export type IListSlice = ReturnType<typeof listSlice.reducer>

export default listSlice.reducer;
