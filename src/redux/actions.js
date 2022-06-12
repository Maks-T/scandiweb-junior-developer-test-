import {
  SET_CURRENCY,
  ADD_PRODUCT,
  INCREASE_QUANTITY_ORDER,
  DECREASE_QUANTITY_ORDER,
  REMOVE_ORDER,
} from './actionTypes';

export const setCurrency = (curCurrency) => ({
  type: SET_CURRENCY,
  payload: {
    curCurrency,
  },
});

export const addToCart = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    product,
  },
});

export const increaseQuantityOrder = (orderId) => ({
  type: INCREASE_QUANTITY_ORDER,
  payload: {
    orderId,
  },
});

export const decreaseQuantityOrder = (orderId) => ({
  type: DECREASE_QUANTITY_ORDER,
  payload: {
    orderId,
  },
});

export const removeOrder = (orderId) => ({
  type: REMOVE_ORDER,
  payload: {
    orderId,
  },
});
