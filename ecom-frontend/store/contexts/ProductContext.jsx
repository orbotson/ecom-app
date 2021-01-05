import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';

const initialState = {
    shoppingCart: [],
    prevLocale: {},
    currLocale: { locale: 'en-US', currency: 'USD' },
};

const availableLocales = [
    { locale: 'en-US', currency: 'USD', lang: 'English' },
    { locale: 'he', currency: 'ILS', lang: 'Hebrew' },
];

//Actions
const UPDATE_CART = 'UPDATE_CART';
const CHANGE_LOCALE = 'CHANGE_LOCALE';

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    function updateShoppingCart(cartData) {
        dispatch({ type: UPDATE_CART, cartData });
    }

    function changeLocale(locale) {
        const nextLocale = availableLocales.find(loc => loc.locale === locale);
        dispatch({ type: CHANGE_LOCALE, nextLocale });
    }

    return (
        <ProductContext.Provider
            value={{
                shoppingCart: state.shoppingCart,
                prevLocale: state.prevLocale,
                currLocale: state.currLocale,
                updateShoppingCart,
                changeLocale,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
