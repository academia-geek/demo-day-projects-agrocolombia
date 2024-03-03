import { typesLogin } from "../Types/types";

const loginReducer = (state = {}, action) => {
    switch (action.type) {

        case typesLogin.login:
            console.log(action.payload.email);
            return {
                email: action.payload.email,
                pass: action.payload.pass,
            };

        case typesLogin.logout:
            return {
                email: null,
                pass: null,
            };

        default:
            return state;
    }
};

export default loginReducer;