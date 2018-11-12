import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from "../constants";
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated:false,
    user:{}
};


const anth = (state=initialState,action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated:!isEmpty(action.user),
                user:action.user
            }
        case CLEAR_CURRENT_USER:
            return {
                isAuthenticated:false,
                user:{}
            }
        default:
            return state;
    }
}

export default anth;