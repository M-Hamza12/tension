import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  id: string;
  userName: string;
}

const initialState: User = { email: '', id: '', userName: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
      state.userName = action.payload.user.userName;
    },
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
