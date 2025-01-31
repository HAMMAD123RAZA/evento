import { createSlice } from '@reduxjs/toolkit';

const SavedCardsSlice = createSlice({
  name: 'savedCards',
  initialState: {
    savedItems: [], // Array to store saved cards
  },
  reducers: {
    addToSaved: (state, action) => {
      const card = action.payload;
      const existingItem = state.savedItems.find((item) => item.id === card.id);
      if (!existingItem) {
        state.savedItems.push(card); // Add the card if it doesn't already exist
      }
    },
    removeFromSaved: (state, action) => {
      const cardId = action.payload;
      state.savedItems = state.savedItems.filter((item) => item.id !== cardId);
    },
  },
});

export const { addToSaved, removeFromSaved } = SavedCardsSlice.actions;
export default SavedCardsSlice.reducer;