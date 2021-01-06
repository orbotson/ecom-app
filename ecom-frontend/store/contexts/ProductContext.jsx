import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';

const initialState = {
    shoppingCart: [],
    prevLocale: {},
    currLocale: { locale: 'en-US', currency: 'USD', lang: 'English', flagUrl: '/images/us.svg' },
    availableLocales: [
        { locale: 'en-US', currency: 'USD', lang: 'English', flagUrl: '/images/us.svg' },
        { locale: 'he', currency: 'ILS', lang: 'Hebrew', flagUrl: '/images/il.svg' },
    ],
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

    function changeLocale(locale) {
        const nextLocale = state.availableLocales.find(loc => loc.locale === locale);
        dispatch({ type: CHANGE_LOCALE, nextLocale });
    }

    return (
        <ProductContext.Provider
            value={{
                shoppingCart: state.shoppingCart,
                prevLocale: state.prevLocale,
                currLocale: state.currLocale,
                availableLocales: state.availableLocales,
                updateShoppingCart,
                changeLocale,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
