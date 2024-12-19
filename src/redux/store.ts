import { configureStore } from '@reduxjs/toolkit';
import slices from './slices';

// it will make temporary global state/ database FE
export const store = configureStore({
  reducer: slices,
  devTools: import.meta.env.MODE == 'development'
});

export type RootState = ReturnType<typeof store.getState>;
