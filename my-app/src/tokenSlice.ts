import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: '',
  },
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.value = action.payload.token;
      console.log(action.payload.token);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
