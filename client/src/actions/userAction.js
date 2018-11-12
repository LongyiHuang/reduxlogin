import axios from 'axios';
export const editUserInfo = (data) =>{
    return dispatch => {
        return axios.post(`api/user`,data);
    };
}