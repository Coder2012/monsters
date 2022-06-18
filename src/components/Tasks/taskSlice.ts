import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface TaskState {
  selectedTasks: string[];
}

const initialState: TaskState = {
  selectedTasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addSelectedTasks(state, action: PayloadAction<string>) {
      state.selectedTasks.push(action.payload);
    },
    removeSelectedTasks(state, action: PayloadAction<string>) {
      state.selectedTasks = state.selectedTasks.filter(
        (value: string) => value !== action.payload
      );
    },
    clearSelectedTasks(state, action: PayloadAction<null>) {
      state.selectedTasks = initialState.selectedTasks;
    },
  },
});

export const { addSelectedTasks, removeSelectedTasks, clearSelectedTasks } =
  taskSlice.actions;
export const getSelectedTasks = (state: RootState) => state.tasks.selectedTasks;
export default taskSlice.reducer;
