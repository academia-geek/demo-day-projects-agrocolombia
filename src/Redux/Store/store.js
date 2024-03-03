import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import loginReducer from "../Reducers/loginReducers";
import { thunk } from "redux-thunk";
import userReducer from "../Reducers/userReducers";

const middleware = [thunk];

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ || compose;


const reducers = combineReducers({
    loginStore: loginReducer,
    userStore: userReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);