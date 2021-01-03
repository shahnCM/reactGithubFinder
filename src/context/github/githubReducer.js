import {
    SEARCH_USERS,
    SET_LOADING,
    SET_ERROR,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false,
            }             
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }  
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false,
            }                  
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }    
            
    
        default:
            return state;
    }
}