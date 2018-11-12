import {Add_FLASH_MESSAGE,DELETE_FLASH_MESSAGE} from "../constants";
import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

const flashMessages = (state=[], action={}) => {
    switch (action.type) {
        case Add_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id:shortid.generate(),
                    type:action.message.type,
                    text:action.message.text
                }
            ]
        case DELETE_FLASH_MESSAGE:
            //和fliter 一样
            const index = findIndex(state,{id:action.id});
            if(index >= 0){
                return [
                    ...state.slice(0,index),
                    ...state.slice(index+1)
                ]
            }
            return state;
        default:
            return state;
    }
}

export default flashMessages;