import { ADD_PRODUCT } from '../actionTypes';

const initialState = {
  products: ['1', '2', '3', '4'],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { products } = action.payload;

      return {
        products: [...state.products, ...products],
      };
    }

    default:
      return state;
  }
}
