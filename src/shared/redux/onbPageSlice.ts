import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum OnbPages {
  AGE = 'age',
  FlAPPY = 'flappy',
  MENU = 'menu',
  START = 'start',
}

interface stateType {
  currentPage: OnbPages;
}

const initialState: stateType = {
  currentPage: OnbPages.AGE,
};

export const OnbPage = createSlice({
  name: 'OnbPage',
  initialState,
  reducers: {
    setOnboardingPage(state, action: PayloadAction<OnbPages>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setOnboardingPage } = OnbPage.actions;

export default OnbPage.reducer;
