import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../Config/FireBase/fireBaseConfig";
import { getAuth } from "firebase/auth";
import { typesCombos } from "../Types/types";

// ------------------Listar---------------------
export const actionListCombosAsyn = () => {
    const pro = [];
    return async (dispatch) => {
        const productosListar = await getDocs(collection(dataBase, "Combos"));
        productosListar.forEach((p) => {
            pro.push({
                ...p.data(),
            });
        });
        dispatch(actionListCombosSyn(pro));
    };
};

export const actionListCombosSyn = (payload) => {
    return {
        type: typesCombos.list,
        payload,
    };
};


// ------------------Seacrh ID--------------------------
export const actionSearchComboIDAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Combos");
        const q = query(
            productosCollection,
            where("id", "==", payload),
        );

        const dataQ = await getDocs(q);
        const prod = [];
        dataQ.forEach((docu) => {
            prod.push(docu.data());
        });
        const product = prod.find(item => item.id === payload);
        dispatch(actionSearchComboIDSyn(prod));
        return product
    };
};

export const actionSearchComboIDSyn = (payload) => {
    return {
        type: typesCombos.search,
        payload,
    };
};


// ------------------Agregar---------------------
export const actionAddCombosAsyn = (payload) => {
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Combos"), payload)
            .then((resp) => {
                dispatch(actionAddCombosSyn(payload));
                dispatch(actionListCombosAsyn());
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddCombosSyn = (payload) => {
    return {
        type: typesCombos.add,
        payload,
    };
};

// ------------------Editar---------------------
export const actionEditCombosAsyn = (payload) => {
    return async (dispatch) => {
        let uid = "";
        const collectionP = collection(dataBase, "Combos");
        const q = query(collectionP, where("id", "==", payload.id));
        const datosQ = await getDocs(q);
        datosQ.forEach((docu) => {
            uid = docu.id;
        });
        const docRef = doc(dataBase, "Combos", uid);
        await updateDoc(docRef, payload)
            .then((resp) => {
                dispatch(actionEditCombosSyn(payload));
                dispatch(actionListCombosAsyn());
            })
            .catch((error) => console.log(error));
    };
};

export const actionEditCombosSyn = (payload) => {
    return {
        type: typesCombos.edit,
        payload,
    };
};

// ----------------Eliminar Productos-----------------------

export const actionDeleteCombosAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Combos");
        const q = query(productosCollection, where("id", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Combos", docu.id));
        });
        dispatch(actionDeleteCombosSyn(payload));
        dispatch(actionListCombosAsyn());
    };
};

export const actionDeleteCombosSyn = (payload) => {
    return {
        type: typesCombos.delete,
        payload,
    };
};

// ------------------Seacrh--------------------------
export const actionSearchCombosAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Combos");
        const q = query(
            productosCollection,
            where("name", ">=", payload),
            where("name", "<=", payload + '\uf8ff')
        );

        const dataQ = await getDocs(q);
        const prod = [];
        dataQ.forEach((docu) => {
            prod.push(docu.data());
        });
        dispatch(actionSearchCombosSyn(prod));
        return prod
    };
};

export const actionSearchCombosSyn = (payload) => {
    return {
        type: typesCombos.search,
        payload,
    };
};

// ----------------- ADD COMMENT ------------------------- //
export const actionAddCommentCombosAsync = (publicationId, comment) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Combos", publicationId);
                const publicationDocSnap = await getDoc(publicationDocRef);
                const commentId = crypto.randomUUID()
                if (publicationDocSnap.exists()) {
                    const publicationData = publicationDocSnap.data();
                    const newComment = {
                        uid: userUid,
                        comment: comment,
                        commentId: commentId
                    };
                    await updateDoc(publicationDocRef, {
                        Comments: arrayUnion([newComment], publicationData.comments),
                    });
                    dispatch(actionAddCommentCombosSyn(newComment));
                } else {
                    console.warn("No se encontró la publicación.");
                }
            } else {
                console.warn("No se encontró el usuario actual.");
            }
        } catch (error) {
            console.error("Error al añadir el comentario:", error);
        }
    };
};

const actionAddCommentCombosSyn = (payload) => {
    return {
        type: typesCombos.comment,
        payload,
    };
};

// ------------------ REMOVE COMMENT ------------------ //

export const actionRemoveCommentCombosAsync = (publicationId, commentId) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Combos", publicationId);
                const publicationDocSnap = await getDoc(publicationDocRef);
                if (publicationDocSnap.exists()) {
                    const publicationData = publicationDocSnap.data();
                    const commentIndex = publicationData.comments.findIndex(
                        (comment) => comment.uid === userUid && comment.commentId === commentId
                    );
                    if (commentIndex !== -1) {
                        await updateDoc(publicationDocRef, {
                            Comments: arrayRemove(publicationData.comments[commentIndex]),
                        });
                        const pay = {
                            IdPublication: publicationId,
                            CommentId: commentId
                        }
                        dispatch(actionRemoveCommentCombosSyn(pay));
                    } else {
                        console.warn("No se encontró el comentario.");
                    }
                } else {
                    console.warn("No se encontró la publicación.");
                }
            } else {
                console.warn("No se encontró el usuario actual.");
            }
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
        }
    };
};

const actionRemoveCommentCombosSyn = (payload) => {
    return {
        type: typesCombos.removeComment,
        payload,
    };
};