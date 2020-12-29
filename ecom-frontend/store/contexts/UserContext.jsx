import React, { createContext, useReducer } from 'react';
import { UserReducer } from '../reducers/UserReducer';

const initialState = {
    loggedInUser: {
        addresses: [
            {
                label: 'Home',
                details: '27 Street, 2569 Heritage Road Visalia, CA 93291',
            },
            { label: 'Office', details: '33 Baker Street, Crescent Road, CA 65746' },
        ],
        contactNums: [
            { label: 'Primary', num: '202-555-0191' },
            { label: 'Secondary', num: '202-555-0701' },
        ],
        creditCards: [
            { vendorImg: 'images/paypal.png', lastNums: '4580', owner: 'Jhon Doe Smith' },
            { vendorImg: 'images/visa.png', lastNums: '8750', owner: 'Jane Doe Smith' },
            { vendorImg: 'images/mastercard.png', lastNums: '3421', owner: 'Jhon Doe Smith' },
        ],
    },
};

//Actions
const UPDATE_USER = 'UPDATE_USER';

export const UserContext = createContext(initialState);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    function updateUser(user) {
        dispatch({ type: UPDATE_USER, user });
    }

    return (
        <UserContext.Provider
            value={{
                loggedInUser: state.loggedInUser,
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
