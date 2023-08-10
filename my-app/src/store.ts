import { configureStore } from '@reduxjs/toolkit';
import { tokenSlice } from './tokenSlice';
import { userSlice } from './slice/userSlice';
import { exerciseSlice } from './slice/exerciseSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    user: userSlice.reducer,
    startExercise : exerciseSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
