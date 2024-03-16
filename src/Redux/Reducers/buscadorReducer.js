import { typesUsers } from '../Types/types';

const buscadorReducer = (state = {}, action) => {
    switch (action.type) {

        case typesUsers.search:
            return {
                resultSearch: action.payload
            };

        default:
            return state;
    }
}

export default buscadorReducer