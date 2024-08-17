import { configureStore } from '@reduxjs/toolkit';
import imageDataReducer from './edit/imageData';

export const makeStore = () => {
  return configureStore({
    reducer: {
      imageData: imageDataReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
