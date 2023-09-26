import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Penis {
  ClASSIC = 'classic',
  RIBBED = 'ribbed',
  EYE = 'eye',
  BLACK = 'black',
}

interface stateType {
  choosePenis: Penis;
}

const initialState: stateType = {
  choosePenis: Penis.ClASSIC,
};

export const choose = createSlice({
  name: 'choose',
  initialState,
  reducers: {
    setPenis(state, action: PayloadAction<Penis>) {
      state.choosePenis = action.payload;
    },
  },
});

export const { setPenis } = choose.actions;

export default choose.reducer;
