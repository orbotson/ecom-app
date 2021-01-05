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
                prevLocale: state.currLocale,
                currLocale: action.nextLocale,
            };
        default:
            return state;
    }
};
