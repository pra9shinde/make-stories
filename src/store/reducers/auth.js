import { LOGIN, LOGOUT } from '../actionTypes';

const initialState = {
    user: null,
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
            };

        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
            };

        default:
            return state;
    }
};

export default authReducer;
