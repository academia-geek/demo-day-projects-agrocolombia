import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { typesLogin } from "../Types/types";

export const actionRegisterAsync = (email, pass) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass)
            .then(async ({ user }) => {
                dispatch(actionRegisterSync(email, pass));
            })
            .catch((error) => {
                console.warn("error", error);
            });
    };
};

export const actionRegisterSync = (email, pass) => {
    console.log("Usuario Agregado ");
    return {
        type: typesLogin.register,
        payload: {email, pass },
    };
};