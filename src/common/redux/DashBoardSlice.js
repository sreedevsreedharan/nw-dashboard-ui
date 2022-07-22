import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  users:[],
  leaveToday:[]
}

export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addUsers: (state, value) => {
      state.users = value.payload;
    },
    addLeaveToday: (state, value) => {
      state.leaveToday = value.payload;
    }    
  },
})

export const { addUsers, addLeaveToday} = DashBoardSlice.actions

export default DashBoardSlice.reducer