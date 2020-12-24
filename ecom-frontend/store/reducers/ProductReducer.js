export const ProductReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_CART':
            return {
                ...state,
                shoppingCart: action.cartData,
            };
        default:
            return state;
    }
};
