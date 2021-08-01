import {
    GET_POSTS,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    GET_POST
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

function postReducer(state = initialState, action) {
    const { type, payload } = action;

    // console.log(payload)
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [ payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
                
            };
        default:
            return state;
    }
}

export default postReducer;