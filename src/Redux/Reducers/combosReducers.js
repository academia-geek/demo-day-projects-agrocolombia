import { typesCombos } from "../Types/types";


const initialState = {
    combos: [],
};

const combosReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesCombos.list:
            return {
                combos: [...action.payload],
            };

        case typesCombos.add:
            return {
                combos: [...state.combos, action.payload],
            };
        case typesCombos.delete:
            return {
                combos: state.combos.filter((p) => p.id !== action.payload),
            };

        case typesCombos.edit:
            const index = state.combos.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                const updatedProduct = { ...state.combos[index] };
                for (const property in action.payload) {
                    if (updatedProduct.hasOwnProperty(property)) {
                        updatedProduct[property] = action.payload[property];
                    }
                }
                return {
                    ...state,
                    combos: [
                        ...state.combos.slice(0, index),
                        updatedProduct,
                        ...state.combos.slice(index + 1),
                    ],
                };
            } else {
                console.warn(
                    `Product with ID ${action.payload.id} not found for editing.`
                );
                return state;
            }

        default:
            return state;
    }
};

export default combosReducers;