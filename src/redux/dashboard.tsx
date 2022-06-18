import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface DashboardState {
  temperatures: number[],
}

const initialState: DashboardState = {
  temperatures: [],
};

export const dashboardSlice = createSlice({
  name: 'dashbaord',
  initialState,
  reducers: {
    setTemperatures: (state, action: PayloadAction<number[]>) => {
      state.temperatures = action.payload;
    },
  },
});

export const {setTemperatures} = dashboardSlice.actions;
export default dashboardSlice.reducer;
