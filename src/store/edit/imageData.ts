import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const imageDataBlobMap = new Map<string, Blob>();

interface ImageData {
  url: string;
}

interface ImageDataWithSize {
  width: number;
  height: number;
}

export interface ImageDataState {
  clientReceived: ImageData;
  edited: ImageData;
  editSize: ImageDataWithSize;
}

const initialState: ImageDataState = {
  clientReceived: {
    url: '',
  },
  edited: {
    url: '',
  },
  editSize: {
    width: 768,
    height: 768,
  },
};

export const imageDataSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setClientReceivedImage: (state, action: PayloadAction<ImageData>) => {
      state.clientReceived = action.payload;
    },
    setEditedImage: (state, action: PayloadAction<ImageData>) => {
      state.edited = action.payload;
    },
    setEditSize: (state, action: PayloadAction<ImageDataWithSize>) => {
      state.editSize = action.payload;
    },
  },
});

export const { setClientReceivedImage, setEditedImage, setEditSize } =
  imageDataSlice.actions;

export default imageDataSlice.reducer;
