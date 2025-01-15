import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../slices/TaskSlices';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
