import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  users:[],
  leaveToday:[],
  vacationPending:[]
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
    addVacationPending: (state, value) => {
      state.vacationPending = value.payload;
    }
  },
})

export const { addUsers, addLeaveToday, addVacationPending} = DashBoardSlice.actions

export default DashBoardSlice.reducer