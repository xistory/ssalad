import createDataContext from './createDataContext';
import { API } from "aws-amplify";

const pointReducer = (state, action) => {
    switch (action.type) {
    case 'get_balance':
        return action.payload;
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

const chargeBalance = dispatch => {
    return async (plus, cashAmount, pAmount) => {

        console.log(cashAmount);

        const init = false;

        try {
            await API.post("points", "/points", {
                body: { init, plus, cashAmount, pAmount }
            });
        } catch (e) {
            console.log(e);
        }
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
    { chargeBalance , getDetails, getBalance },
    []
);
