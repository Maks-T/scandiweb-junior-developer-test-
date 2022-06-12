import {
  ADD_PRODUCT,
  INCREASE_QUANTITY_ORDER,
  DECREASE_QUANTITY_ORDER,
  REMOVE_ORDER,
} from '../actionTypes';

const cart = localStorage.getItem('cart');

let initialState;

if (!cart) {
  initialState = {
    quantity: 0,
    orders: [],
  };
}

if (cart) {
  initialState = { ...JSON.parse(cart) };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT: {
      const { product } = action.payload;

      let updatedState = {};

      const findOrder = state.orders.find(
        (order) => order.orderId === product.orderId
      );

      if (findOrder) {
        findOrder.quantity += 1;
        updatedState = {
          quantity: state.quantity + 1,
          orders: [...state.orders],
        };
      } else {
        updatedState = {
          quantity: state.quantity + 1,
          orders: [...state.orders, product],
        };
      }

      localStorage.setItem('cart', JSON.stringify(updatedState));

      return updatedState;
    }

    case INCREASE_QUANTITY_ORDER: {
      const { orderId } = action.payload;

      let updatedState = {};

      const findOrder = state.orders.find((order) => order.orderId === orderId);

      if (findOrder) {
        findOrder.quantity += 1;
        updatedState = {
          quantity: state.quantity + 1,
          orders: [...state.orders],
        };

        localStorage.setItem('cart', JSON.stringify(updatedState));

        return updatedState;
      }
    }

    case DECREASE_QUANTITY_ORDER: {
      const { orderId } = action.payload;

      let updatedState = {};

      const findOrder = state.orders.find((order) => order.orderId === orderId);

      if (findOrder && findOrder.quantity > 0) {
        findOrder.quantity -= 1;
        updatedState = {
          quantity: state.quantity - 1,
          orders: [...state.orders],
        };

        localStorage.setItem('cart', JSON.stringify(updatedState));

        return updatedState;
      } else return state;
    }

    case REMOVE_ORDER: {
      const { orderId } = action.payload;

      let updatedState = {};

      const findOrder = state.orders.find((order) => order.orderId === orderId);

      if (findOrder) {
        updatedState = {
          quantity: state.quantity - findOrder.quantity,
          orders: state.orders.filter((order) => order.orderId !== orderId),
        };

        localStorage.setItem('cart', JSON.stringify(updatedState));

        return updatedState;
      } else return state;
    }

    default:
      return state;
  }
}
