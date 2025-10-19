import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        };
      }
      return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 }]
      };
    }
    case 'REMOVE_ITEM': {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter(i => i.id !== id)
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

const initialState = { items: [] };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const state = useContext(CartStateContext);
  if (state === undefined) throw new Error('useCart must be used within CartProvider');
  return state;
};

export const useCartDispatch = () => {
  const dispatch = useContext(CartDispatchContext);
  if (dispatch === undefined) throw new Error('useCartDispatch must be used within CartProvider');
  return dispatch;
};

export default CartProvider;
