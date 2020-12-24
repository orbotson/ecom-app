import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';

const initialState = {
    shoppingCart: [],
};

//Actions
const UPDATE_CART = 'UPDATE_CART';

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    function updateShoppingCart(cartData) {
        dispatch({ type: UPDATE_CART, cartData });
    }

    return (
        <ProductContext.Provider
            value={{
                shoppingCart: state.shoppingCart,
                updateShoppingCart,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
