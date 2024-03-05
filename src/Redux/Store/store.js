import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import loginReducer from "../Reducers/loginReducers";
import { thunk } from "redux-thunk";
import userReducer from "../Reducers/userReducers";
import productReducer from "../Reducers/productReducers"
import combosReducers from "../Reducers/combosReducers";
import blogReducers from "../Reducers/blogReducers";

const middleware = [thunk];

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE_ || compose;


const reducers = combineReducers({
    loginStore: loginReducer,
    userStore: userReducer,
    productStore: productReducer,
    combosStore: combosReducers,
    blogStore: blogReducers
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);