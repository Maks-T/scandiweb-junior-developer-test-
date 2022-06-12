import { SET_CURRENCY } from '../actionTypes';

const curCurrency = localStorage.getItem('cur-currency');

let initialState;

if (!curCurrency) {
  initialState = {
    curCurrency: {
      symbol: '$',
      label: 'USD',
    },
  };
}

if (curCurrency) {
  initialState = { curCurrency: JSON.parse(curCurrency) };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY: {
      const { curCurrency } = action.payload;

      localStorage.setItem('cur-currency', JSON.stringify(curCurrency));

      return {
        ...state,
        curCurrency,
      };
    }

    default:
      return state;
  }
}
