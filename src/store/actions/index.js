import { LOGIN, LOGOUT } from '../actionTypes';

export const login = (user, token) => {
    return {
        type: LOGIN,
        payload: { user, token },
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};
