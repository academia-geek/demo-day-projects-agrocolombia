import { typesUsers } from '../Types/types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case typesUsers.list:
            return {
                payload: action.payload
            };

        case typesUsers.add:
            return {
                payload: action.payload
            };

        default:
            return state;
    }
}

export default userReducer