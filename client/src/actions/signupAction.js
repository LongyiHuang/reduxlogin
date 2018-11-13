import axios from 'axios';

export const signupRequest = (userData) => {
    return dispatch => {
        return axios.post('api/signup',userData);
    }
}


export const checkUserExists = (identifier) => {
    return dispatch => {
        return axios.get(`api/user/${identifier}`,identifier);
    }
}