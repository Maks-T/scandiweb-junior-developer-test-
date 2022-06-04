import { ADD_PRODUCT } from './actionTypes';

export const addProducts = (products) => ({
  type: ADD_PRODUCT,
  payload: {
    products,
  },
});
