import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter(item => item !== action.payload.id);
      /* const index = state.items.findIndex(
        basketItem => basketItem.id === action.payload.id
      );
      
      if (index >= 0) {
        // Remove 1 item (index)
        state.items.splice(index, 1, );
      } else {
        console.warn(
          `Cannot remove product (id ${action.payload.id} as it is not`
        )        
      } */
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const itemsTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0)

export default basketSlice.reducer;
