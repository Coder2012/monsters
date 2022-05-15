import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface KidState {
  selectedKidId: string | null;
}

const initialState: KidState = {
  selectedKidId: null,
};

export const kidSlice = createSlice({
  name: 'kid',
  initialState,
  reducers: {
    selectKid(state, action: PayloadAction<string | null>) {
      state.selectedKidId = action.payload;
    },
  },
});

export const { selectKid } = kidSlice.actions;
export const getSelectedKidId = (state: RootState) => state.kids.selectedKidId;
export default kidSlice.reducer;
