import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';

const initialState = {
    shoppingCart: [],
    prevLocaleData: { locale: 'he', currency: 'ILS' },
    localeData: { locale: 'en-US', currency: 'USD' },
};

//Actions
const UPDATE_CART = 'UPDATE_CART';
const CHANGE_LOCALE = 'CHANGE_LOCALE';

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    function updateShoppingCart(cartData) {
        dispatch({ type: UPDATE_CART, cartData });
    }

    function changeLocaleData(locale) {
        dispatch({ type: CHANGE_LOCALE, locale });
    }

    return (
        <ProductContext.Provider
            value={{
                shoppingCart: state.shoppingCart,
                prevLocaleData: state.prevLocaleData,
                localeData: state.localeData,
                updateShoppingCart,
                changeLocaleData,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
