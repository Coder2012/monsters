import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
  selectedTaskId: string | null;
}

const initialState: TaskState = {
  selectedTaskId: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    selectTask(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },
  },
});

export const { selectTask } = taskSlice.actions;
export const getSelectedTaskId = (state: RootState) =>
  state.tasks.selectedTaskId;
export default taskSlice.reducer;
