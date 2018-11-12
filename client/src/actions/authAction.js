import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import {SET_CURRENT_USER} from '../constants';


export const login = (loginData) => {
    const {account,password} = loginData;
    return dispatch => {
        return axios.post('api/auth',{account,password}).then(res => {
            const token = res.data.token;
            localStorage.setItem("token",token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwtDecode(token)));
        });
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('token');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }

}


export const setCurrentUser = (user) => {
    return {
        type:SET_CURRENT_USER,
        user
    }
}