import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './DashBoardSlice'

export const store = configureStore({
  reducer: {
    users: dashboardReducer,
    leaveToday: dashboardReducer,
    publicHolidayToday : dashboardReducer
  },
})