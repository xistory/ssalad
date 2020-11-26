import createDataContext from './createDataContext';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const authReducer = (state, action) => {
    switch (action.type) {
    case 'signin':
        return { errorMessage: '', isAuthenticated: action.payload };
    case 'signout':
        return { errorMessage: '', isAuthenticated: false };
    case 'add_error':
        return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
        return { ...state, errorMessage: '' };
    default:
        return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const navigation = useNavigation();
    try {
        await Auth.currentSession();
        dispatch({ type: 'signin', payload: true });
        navigation.navigate('Home');
    } catch (e) {
        console.log(e);
        navigation.navigate('SignIn');
    }

    /*
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'signin', payload: token });
        navigate('Index');
    } else {
        navigate('Signin');
    }
    */

};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};


const signin = dispatch => async ({ email, password }) => {
    const navigation = useNavigation();
    try {
        await Auth.signIn(email, password);
        dispatch({ type: 'signin', payload: true });
        navigation.navigate('Home');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something wrong signingIn' });
    }
};

const facebookSignin = dispatch => async () => {
    try {
        await Auth.federatedSignIn({provider: "Facebook"});
    } catch (e) {
        dispatch({ type: 'add_error', payload: 'Something wrong signingIn' });
    }
}

const signup = () => {};
const signout = dispatch => async () => {
    await Auth.signOut();
    dispatch({ type: 'signout' });
    // navigate('loginFlow');
};



export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, facebookSignin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
);
