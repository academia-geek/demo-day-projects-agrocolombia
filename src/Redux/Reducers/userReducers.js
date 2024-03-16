import { typesUsers } from '../Types/types';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case typesUsers.list:
            return {
                userData: action.payload
            };

        case typesUsers.add:
            return {
                userData: action.payload
            };

        case typesUsers.addCart:
            return {
                userData: action.payload
            }

        default:
            return state;
    }
}

export default userReducer