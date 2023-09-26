import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stateType {
  pause: boolean;
  count: number;
  isVisiblePopup: boolean;
  isSound: boolean;
}

const initialState: stateType = {
  pause: false,
  count: 0,
  isVisiblePopup: false,
  isSound: true,
};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    togglePause(state) {
      state.pause = !state.pause;
    },
    setPause(state, action: PayloadAction<boolean>) {
      state.pause = action.payload;
    },
    incrementCount(state) {
      state.count = state.count + 1;
    },
    resetCount(state) {
      state.count = 0;
    },
    setIsVisiblePopup(state, action: PayloadAction<boolean>) {
      state.isVisiblePopup = action.payload;
    },
    toggleSound(state) {
      state.isSound = !state.isSound;
    },
  },
});

export const { togglePause, incrementCount, setIsVisiblePopup, resetCount, toggleSound, setPause } =
  game.actions;

export default game.reducer;
