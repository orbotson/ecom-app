export const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            return {
                ...state,
                shoppingCart: action.cartData,
            };
        case 'CHANGE_LOCALE':
            return {
                ...state,
                localeData: action.locale,
            };
        default:
            return state;
    }
};
