import { typesBlog } from "../Types/types";

const initialState = {
    blog: [],
};

const productsReducers = (state = initialState, action) => {
    switch (action.type) {
        case typesBlog.list:
            return {
                blog: [...action.payload],
            };

        case typesBlog.add:
            return {
                blog: [...state.blog, action.payload],
            };
        case typesBlog.delete:
            return {
                blog: state.blog.filter((p) => p.id !== action.payload),
            };

        case typesBlog.edit:
            const index = state.blog.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                const updatedProduct = { ...state.blog[index] };
                for (const property in action.payload) {
                    if (updatedProduct.hasOwnProperty(property)) {
                        updatedProduct[property] = action.payload[property];
                    }
                }
                return {
                    ...state,
                    blog: [
                        ...state.blog.slice(0, index),
                        updatedProduct,
                        ...state.blog.slice(index + 1),
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

export default productsReducers;