import { configureStore } from '@reduxjs/toolkit';
import savedCardsReducer from './savedCardsSlice';

const store = configureStore({
  reducer: {
    savedCards: savedCardsReducer,
  },
});

export default store;