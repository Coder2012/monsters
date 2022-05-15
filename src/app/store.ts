import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import kidsReducer from '../components/Kids/kidSlice';
import TasksReducer from '../components/Tasks/taskSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    kids: kidsReducer,
    tasks: TasksReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
