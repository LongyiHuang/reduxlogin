import axios from 'axios';

export const signupRequest = (userData) => {
    return dispatch => {
        return axios.post('api/users',userData);
    }
}


export const checkUserExists = (identifier) => {
    return dispatch => {
        return axios.post(`api/users/${identifier}`,identifier);
    }
}