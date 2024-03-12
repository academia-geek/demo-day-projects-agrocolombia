
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { typesLogin } from "../Types/types";
import { google } from "../../Config/FireBase/fireBaseConfig";

// ------------Iniciando con Usuario y Contraseña---------------------//

export const actionLoginAsyn = (email, pass) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;
            dispatch(actionLoginSyn(email, pass));
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-credential') {
                return 'Usuario NO Autorizado. Correo o Contraseña incorrecta.';
            }
            else if (errorCode === 'auth/invalid-email'){
                return 'Ingrese un usuario o contraseña validos'
            } else {
                return ('Error inesperado:', errorCode, errorMessage); 
            }
        }
    };
};

export const actionLoginSyn = (email, pass) => {
    return {
        type: typesLogin.login,
        payload: { email, pass },
    };
};

// ------------Iniciando con Google-----------------------//
export const actionGoogle = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, google)
            .then((result) => {
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

// ------------------------Logout-------------------------------//

export const actionLogoutAsyn = () => {
    return (dispatch) => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(actionLogoutSyn);
            })
            .catch((error) => {
                console.warn(error);
            });
    };
};

export const actionLogoutSyn = () => {
    return {
        type: typesLogin.logout,
    };
};