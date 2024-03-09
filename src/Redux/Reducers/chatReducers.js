import { typesChats } from "../Types/types";


const initialState = {
    chats: [],
};

const chatReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesChats.list:
            return {
                chats: [...action.payload],
            };

        default:
            return state;
    }
};

export default chatReducers;