export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                loggedInUser: action.user,
            };
        default:
            return state;
    }
};
