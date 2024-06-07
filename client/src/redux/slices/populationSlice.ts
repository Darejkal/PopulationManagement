import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    memberList: [],
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.memberList.push(action.payload); 
        },
    },
});

export const { addMember } = membersSlice.actions;
export type IMemberSlice = ReturnType<typeof membersSlice.reducer>
export default membersSlice.reducer;