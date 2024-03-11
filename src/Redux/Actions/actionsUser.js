import { getAuth } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
                dispatch(actionListUserSyn(docData));
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

// ------------------Listar usuario con uid--------------------- //
export const actionListUserUidAsyn = (payload) => {
    const userId = payload;
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
                const usuarios = [];
                datosQ.forEach((docu) => {
                    usuarios.push({
                        ...docu.data(),
                        id: docu.id,
                    });
                });
                const documentReference = datosQ.docs[0].ref;
                const documentSnapshot = await getDoc(documentReference);
                const docData = documentSnapshot.data()
                dispatch(actionListUserUidSyn(docData));
            } catch (error) {
                console.log(error);
            }
        } else {
            console.warn("no se envio la id");
        }
    };
}

export const actionListUserUidSyn = (payload) => {
    return {
        type: typesUsers.search,
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
        fotoUrl: "https://res.cloudinary.com/dlwr6vxib/image/upload/v1710173431/Guajolota/imagen_2024-03-11_111028939_eho0zn.png",
        products: [],
        combos: [],
        blogs: []
    };
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Users"), modifiedPayload)
            .then((resp) => {
                dispatch(actionAddUserSyn(modifiedPayload));
                dispatch(actionListUserAsyn())
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

// ------------------Editar---------------------
export const actionEditUserAsyn = (payload) => {
    return async (dispatch) => {
        try {
            let uid = "";
            const collectionP = collection(dataBase, "Users");
            const q = query(collectionP, where("uid", "==", payload.uid));
            const datosQ = await getDocs(q);
            datosQ.forEach((docu) => {
                uid = docu.id;
            });
            const docRef = doc(dataBase, "Users", uid);
            await updateDoc(docRef, payload)
                .then((resp) => {
                    dispatch(actionEditUserSyn(payload));
                    dispatch(actionListUserAsyn())
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error)
        }
    };
};

export const actionEditUserSyn = (payload) => {
    return {
        type: typesUsers.edit,
        payload,
    };
};

// ----------------Eliminar Usuario-----------------------

export const actionDeleteUserAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Users");
        const q = query(productosCollection, where("uid", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Users", docu.id));
        });
        dispatch(actionDeleteUserSyn(payload));
    };
};

export const actionDeleteUserSyn = (payload) => {
    return {
        type: typesUsers.delete,
        payload,
    };
};


// ----------------Add carrito producto Perfil-----------------------
//requiere enviar el UID, el ID del producto y la cantidad {idUser: user.currenUser.UID, idProduct: 5, amount: 4}

export const actionAddCartItemAsyn = (payload) => {
    return async (dispatch) => {
        const idUser = payload.idUser;
        const idProduct = payload.idProduct;
        const amount = payload.amount;
        let uid;
        try {
            const userDocRef = query(
                collection(dataBase, "Users"),
                where("uid", "==", idUser)
            );
            const datosQ = await getDocs(userDocRef);
            datosQ.forEach((docu) => {
                uid = docu.id;
            });
            const docRef = doc(dataBase, "Users", uid);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            if (!docData.cart) {
                docData.cart = [];
            }
            const itemIndex = docData.cart.findIndex(item => item.idProduct === idProduct);
            if (itemIndex !== -1) {
                // Producto encontrado en el carrito
                if (amount > 0) {
                    // Agregar
                    docData.cart[itemIndex].cantidad += amount;
                } else if (amount < 0) {
                    // Restar
                    docData.cart[itemIndex].cantidad += amount;
                    if (docData.cart[itemIndex].cantidad <= 0) {
                        // Eliminar si la cantidad llega a 0
                        docData.cart.splice(itemIndex, 1);
                    }
                }
            } else if (amount > 0) {
                // Producto nuevo y cantidad positiva, agregarlo
                docData.cart.push({ idProduct, cantidad: amount });
            }
            await updateDoc(docRef, docData).then((resp) => {
                dispatch(actionAddCartItemSyn(payload));
                dispatch(actionListUserAsyn())
            })
                .catch((e) => {
                    console.error(e)
                });
        } catch (error) {
            console.log(error)
        }
    };
};

export const actionAddCartItemSyn = (payload) => {
    return {
        type: typesUsers.addCart,
        payload,
    };
};

// ----------------Add carrito Combo Perfil-----------------------
//requiere enviar el UID, el ID del combo y la cantidad {idUser: user.currenUser.UID, idProduct: 5, amount: 4}

export const actionAddCartItemComboAsyn = (payload) => {
    return async (dispatch) => {
        const idUser = payload.idUser;
        const idProduct = payload.idProduct;
        const amount = payload.amount;
        let uid;
        try {
            const userDocRef = query(
                collection(dataBase, "Users"),
                where("uid", "==", idUser)
            );
            const datosQ = await getDocs(userDocRef);
            datosQ.forEach((docu) => {
                uid = docu.id;
            });
            const docRef = doc(dataBase, "Users", uid);
            const docSnap = await getDoc(docRef);
            const docData = docSnap.data();
            if (!docData.cartCombo) {
                docData.cartCombo = [];
            }
            const itemIndex = docData.cart.findIndex(item => item.idProduct === idProduct);
            if (itemIndex !== -1) {
                // Producto encontrado en el carrito
                if (amount > 0) {
                    // Agregar
                    docData.cartCombo[itemIndex].cantidad += amount;
                } else if (amount < 0) {
                    // Restar
                    docData.cartCombo[itemIndex].cantidad += amount;
                    if (docData.cartCombo[itemIndex].cantidad <= 0) {
                        // Eliminar si la cantidad llega a 0
                        docData.cartCombo.splice(itemIndex, 1);
                    }
                }
            } else if (amount > 0) {
                // Producto nuevo y cantidad positiva, agregarlo
                docData.cartCombo.push({ idProduct, cantidad: amount });
            }
            await updateDoc(docRef, docData).then((resp) => {
                dispatch(actionAddCartItemComboSyn(payload));
                dispatch(actionListUserAsyn())
            })
                .catch((e) => {
                    console.error(e)
                });
        } catch (error) {
            console.log(error)
        }
    };
};

export const actionAddCartItemComboSyn = (payload) => {
    return {
        type: typesUsers.addToCart,
        payload,
    };
};


// ---------------------- Buscar usuario ----------------- //

export const actionSearchUserAsync = (payload) => {
    return async (dispatch) => {
        try {
            const userCollection = collection(dataBase, "Users");
            const querySearch = query(userCollection, where("UserName", "==", payload));
            const querySnapshot = await getDocs(querySearch);
            if (querySnapshot.empty) {
                console.warn("No se encontraron documentos para el nombre de usuario");
                return;
            }
            const documentReference = querySnapshot.docs[0].ref;
            const documentSnapshot = await getDoc(documentReference);
            const docData = documentSnapshot.data()
            return docData
        } catch (error) {
            console.error("Error searching user:", error);
        }
    };
};

export const actionSearchUserSyn = (payload) => {
    return {
        type: typesUsers.search,
        payload,
    };
}

// ------------- SAVE POST -------------------- //
// enviar en el payload {id.}
export const actionSavePostAsync = (payload) => {
    return async (dispatch) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.uid : null;
            if (userId) {
                const userDocRef = doc(dataBase, "Users", userId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const propertyToSave = payload.tipo === "producto" ? "savedProducts" : payload.tipo === "combo" ? "savedCombos" : null; // Improved property selection using nullish coalescing
                    if (propertyToSave) {
                        const savedItems = userData[propertyToSave] || []; // Create an empty array if the property doesn't exist
                        const hasSaved = savedItems.includes(payload);
                        const updateData = {
                            [propertyToSave]: hasSaved ? arrayRemove(payload) : arrayUnion(payload), // Optimized update based on existence
                        };
                        await updateDoc(userDocRef, updateData);
                        dispatch(actionSavePostSyn(payload));
                        dispatch(actionListUserAsyn())
                    } else {
                        console.warn("Invalid 'tipo' property:", payload.tipo);
                    }
                } else {
                    console.warn("No se encontró el usuario en firestore.");
                }
            } else {
                console.warn("No se encontró el usuario logeado.");
            }
        } catch (error) {
            console.error("Error al guardar o eliminar una publicación:", error);
        }
    };
};

const actionSavePostSyn = (payload) => {
    return {
        type: typesUsers.saved,
        payload,
    };
}