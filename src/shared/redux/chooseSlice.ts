import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Ball {
  ClASSIC = 'classic',
  RIBBED = 'ribbed',
  EYE = 'eye',
  BLACK = 'black',
}

interface stateType {
  chooseBall: Ball;
}

const initialState: stateType = {
  chooseBall: Ball.ClASSIC,
};

export const choose = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    setBall(state, action: PayloadAction<Ball>) {
      state.chooseBall = action.payload;
    },
  },
});

export const { setBall } = choose.actions;

export default choose.reducer;
