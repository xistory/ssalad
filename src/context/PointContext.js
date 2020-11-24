import createDataContext from './createDataContext';
import { API } from "aws-amplify";

const pointReducer = (state, action) => {
    switch (action.type) {
    case 'get_balance':
        return action.payload;
    case 'delete_blogpost':
        return state.filter(blogPost => blogPost.id !== action.payload);
    case 'get_details':
        return { ...state, details: action.payload };
    default:
        return state;
    }
};

const getBalance = dispatch => {
    return async () => {
        try {
            const balance = await API.get("points", "/balance");
            dispatch({ type: 'get_balance', payload: balance });
        } catch (e) {
            console.log(e);
        }
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
//        await jsonServer.post('/blogposts', { title, content });

        if (callback) {
            callback();
        }
    };
};
const deleteBlogPost = dispatch => {
    return async id => {
//        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id })
    };
};

const getDetails = dispatch => {
    return async () => {
        try {
            const details = await API.get("points", "/details");
            dispatch({ type: 'get_details', payload: details});
        } catch (e) {
            console.log(e);
        }
    };
};

export const { Context, Provider } = createDataContext(
    pointReducer,
    { addBlogPost, deleteBlogPost, getDetails, getBalance },
    []
);
