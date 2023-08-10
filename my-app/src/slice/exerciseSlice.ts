import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Exercise {
    bodyPart: string;
    gifUrl: string;
    equipment: string;
    id: string;
    name: string;
    target: string;
    sets : number;
    reps : number;
  }
  
  interface UserExercise {
    day : string;
    title : string;
    __v : number;
    _id : string;
    exercises : Exercise [],
  }
  const initialState : UserExercise = {day : '' , title : '' , __v : 0 , _id : '' , exercises : []}

  export const exerciseSlice = createSlice({
    name: 'startExercise',
    initialState,
    reducers: {
      setStartExercise: (state, action: PayloadAction<{ ex: UserExercise }>) => {
        state.__v = action.payload.ex.__v;
        state._id = action.payload.ex._id;
        state.day = action.payload.ex.day;
        state.exercises = action.payload.ex.exercises;
        state.title = action.payload.ex.title;
      },
    },
  });
  export const { setStartExercise } = exerciseSlice.actions;
  
  export default exerciseSlice.reducer;