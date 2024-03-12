import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../Config/FireBase/fireBaseConfig";
import { typesProducts } from "../Types/types";
import { getAuth } from "firebase/auth";

// ------------------Listar---------------------
export const actionListproductAsyn = () => {
    const pro = [];
    return async (dispatch) => {
        const productosListar = await getDocs(collection(dataBase, "Products"));
        productosListar.forEach((p) => {
            pro.push({
                ...p.data(),
            });
        });
        dispatch(actionListproductSyn(pro));
    };
};

export const actionListproductSyn = (payload) => {
    return {
        type: typesProducts.list,
        payload,
    };
};

// ------------------Agregar---------------------
export const actionAddproductAsyn = (payload) => {
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Products"), payload)
            .then((resp) => {
                dispatch(actionAddproductSyn(payload));
                dispatch(actionListproductAsyn());
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddproductSyn = (payload) => {
    return {
        type: typesProducts.add,
        payload,
    };
};

// ------------------Editar---------------------
export const actionEditProductAsyn = (payload) => {
    console.log(payload)
    return async (dispatch) => {
        let uid = "";
        const collectionP = collection(dataBase, "Products");
        const q = query(collectionP, where("id", "==", payload.id));
        const datosQ = await getDocs(q);
        datosQ.forEach((docu) => {
            uid = docu.id;
        });
        const docRef = doc(dataBase, "Products", uid);
        await updateDoc(docRef, payload)
            .then((resp) => {
                dispatch(actionEditProductSyn(payload));
                dispatch(actionListproductAsyn());
            })
            .catch((error) => console.log(error));
    };
};

export const actionEditProductSyn = (payload) => {
    return {
        type: typesProducts.edit,
        payload,
    };
};

// ----------------Eliminar Productos-----------------------

export const actionDeleteProductAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Products");
        const q = query(productosCollection, where("id", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Products", docu.id));
        });
        dispatch(actionDeleteProductSyn(payload));
        dispatch(actionListproductAsyn());
    };
};

export const actionDeleteProductSyn = (payload) => {
    return {
        type: typesProducts.delete,
        payload,
    };
};

// ------------------Seacrh--------------------------
export const actionSearchProductAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Products");
        const q = query(
            productosCollection,
            where("name", ">=", payload.toLowerCase()),
            where("name", "<=", payload.toLowerCase() + '\uf8ff')
        );

        const dataQ = await getDocs(q);
        const prod = [];
        dataQ.forEach((docu) => {
            prod.push(docu.data());
        });
        dispatch(actionSearchProductSyn(prod));
        return prod
    };
};

export const actionSearchProductSyn = (payload) => {
    return {
        type: typesProducts.search,
        payload,
    };
};

// ------------------Seacrh ID--------------------------
export const actionSearchProductIDAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Products");
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
        dispatch(actionSearchProductIDSyn(prod));
        return product
    };
};

export const actionSearchProductIDSyn = (payload) => {
    return {
        type: typesProducts.search,
        payload,
    };
};

// ----------------- ADD COMMENT ------------------------- //
export const actionAddCommentAsync = (publicationId, comment) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Products", publicationId);
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
                    dispatch(actionAddCommentSyn(newComment));
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

const actionAddCommentSyn = (payload) => {
    return {
        type: typesProducts.comment,
        payload,
    };
};

// ------------------ REMOVE COMMENT ------------------ //

export const actionRemoveCommentAsync = (publicationId, commentId) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Products", publicationId);
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
                        dispatch(actionRemoveCommentSyn(pay));
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

const actionRemoveCommentSyn = (payload) => {
    return {
        type: typesProducts.removeComment,
        payload,
    };
};