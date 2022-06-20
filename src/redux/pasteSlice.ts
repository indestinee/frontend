import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PasteInfo} from '../schemas/paste';


interface PasteState {
  ip: string,
  pasteInfos: PasteInfo[],
}

const initialState: PasteState = {
  ip: 'unknown',
  pasteInfos: [],
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    setIp: (state, action: PayloadAction<string>) => {
      state.ip = action.payload;
    },
    setPasteInfos: (state, action: PayloadAction<PasteInfo[]>) => {
      const copiesArray = [...action.payload];
      state.pasteInfos = !!copiesArray.length ?
        copiesArray.sort((a, b) => b.time - a.time): [];
    },
  },
});

export const {setIp, setPasteInfos} = pasteSlice.actions;
export default pasteSlice.reducer;
