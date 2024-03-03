import { getAuth } from "firebase/auth";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { typesUsers } from "../Types/types";
import { dataBase } from "../../Config/FireBase/fireBaseConfig";

// ------------------Listar usuario personal--------------------- //
export const actionListUserAsyn = () => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    return async (dispatch) => {
        if (userId) {
            try {
                const collectionP = collection(dataBase, "Users");
                const q = query(collectionP, where("uid", "==", userId));
                const datosQ = await getDocs(q);
                if (datosQ.empty) {
                    console.warn("No encontrado");
                    return;
                }
                const usuarios= [];
                datosQ.forEach((docu) => {
                    usuarios.push({
                        ...docu.data(),
                        id: docu.id,
                    });
                });
                const documentReference = datosQ.docs[0].ref;
                const documentSnapshot = await getDoc(documentReference);
                const docData = documentSnapshot.data()
                dispatch(actionListUserSyn(usuarios));
                return docData
            } catch (error) {
                console.log(error);
            }
        } else {
            console.warn("Current user is not authenticated.");
        }
    };
}

export const actionListUserSyn = (payload) => {
    return {
        type: typesUsers.list,
        payload,
    };
};

// ------------------Crear usuario--------------------- //
export const actionAddUserAsyn = (payload) => {
    const user = getAuth()
    const UID = user.currentUser?.uid;
    const idCart = crypto.randomUUID()
    const modifiedPayload = {
        ...payload,
        uid: UID,
        idCart: idCart,
        history: [],
        favorites: [],
        fotoUrl: "",
        products: [],
        combos: []
    };
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Users"), modifiedPayload)
            .then((resp) => {
                dispatch(actionAddCartUserAsyn({id: idCart}))
                dispatch(actionAddUserSyn(modifiedPayload));
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddUserSyn = (payload) => {
    return {
        type: typesUsers.add,
        payload,
    };
};

// ------------------Crear--------------------- //
export const actionAddCartUserAsyn = (payload) => {
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Carts"), payload)
            .then((resp) => {
                dispatch(actionAddCartUserSyn(payload));
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddCartUserSyn = (payload) => {
    return {
        type: typesUsers.addCart,
        payload,
    };
};