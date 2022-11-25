import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  users:[],
  leaveToday:[],
  publicHolidayToday:[],
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
    },
    addPublicHolidayToday: (state, value) => {
      state.publicHolidayToday = value.payload;
    }    
  },
})

export const { addUsers, addLeaveToday, addPublicHolidayToday} = DashBoardSlice.actions

export default DashBoardSlice.reducer