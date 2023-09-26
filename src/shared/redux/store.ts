import { configureStore } from '@reduxjs/toolkit';
import choose from './chooseSlice';
import onbPage from './onbPageSlice';
import game from './gameSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { onbPage, choose, game },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
