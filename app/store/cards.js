import { createStore } from 'redux';

const cards = (state = 1, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1
    default:
      return state;
  }
};

const store = createStore(cards);

module.exports = store;
