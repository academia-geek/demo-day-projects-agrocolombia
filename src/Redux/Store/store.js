import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import loginReducer from "../Reducers/loginReducers";
import { thunk } from "redux-thunk";
import userReducer from "../Reducers/userReducers";
import productReducer from "../Reducers/productReducers"
import combosReducers from "../Reducers/combosReducers";
import blogReducers from "../Reducers/blogReducers";
import chatReducers from "../Reducers/chatReducers";
import buscadorReducer from "../Reducers/buscadorReducer";

const middleware = [thunk];

const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;


const reducers = combineReducers({
    loginStore: loginReducer,
    userStore: userReducer,
    productStore: productReducer,
    combosStore: combosReducers,
    blogStore: blogReducers,
    chatStore: chatReducers,
    resultStore: buscadorReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);