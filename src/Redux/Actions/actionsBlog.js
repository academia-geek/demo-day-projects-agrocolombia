import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../Config/FireBase/fireBaseConfig";
import { getAuth } from "firebase/auth";
import { typesBlog } from "../Types/types";

// ------------------Listar---------------------
export const actionListBlogAsyn = () => {
    const pro = [];
    return async (dispatch) => {
        const productosListar = await getDocs(collection(dataBase, "Blog"));
        productosListar.forEach((p) => {
            pro.push({
                ...p.data(),
            });
        });
        dispatch(actionListBlogSyn(pro));
    };
};

export const actionListBlogSyn = (payload) => {
    return {
        type: typesBlog.list,
        payload,
    };
};

// ------------------Agregar---------------------
export const actionAddBlogAsyn = (payload) => {
    return async (dispatch) => {
        await addDoc(collection(dataBase, "Blog"), payload)
            .then((resp) => {
                dispatch(actionAddBlogSyn(payload));
                dispatch(actionListBlogAsyn());
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddBlogSyn = (payload) => {
    return {
        type: typesBlog.add,
        payload,
    };
};

// ------------------Editar---------------------
export const actionEditBlogAsyn = (payload) => {
    return async (dispatch) => {
        let uid = "";
        const collectionP = collection(dataBase, "Blog");
        const q = query(collectionP, where("id", "==", payload.id));
        const datosQ = await getDocs(q);
        datosQ.forEach((docu) => {
            uid = docu.id;
        });
        const docRef = doc(dataBase, "Blog", uid);
        await updateDoc(docRef, payload)
            .then((resp) => {
                dispatch(actionEditBlogSyn(payload));
                dispatch(actionListBlogAsyn());
            })
            .catch((error) => console.log(error));
    };
};

export const actionEditBlogSyn = (payload) => {
    return {
        type: typesBlog.edit,
        payload,
    };
};

// ----------------Eliminar Productos-----------------------

export const actionDeleteBlogAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Blog");
        const q = query(productosCollection, where("id", "==", payload));
        const dataQ = await getDocs(q);
        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Blog", docu.id));
        });
        dispatch(actionDeleteBlogSyn(payload));
        dispatch(actionListBlogAsyn());
    };
};

export const actionDeleteBlogSyn = (payload) => {
    return {
        type: typesBlog.delete,
        payload,
    };
};

// ------------------Seacrh--------------------------
export const actionSearchBlogAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Blog");
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
        dispatch(actionSearchBlogSyn(prod));
    };
};

export const actionSearchBlogSyn = (payload) => {
    return {
        type: typesBlog.search,
        payload,
    };
};

// ----------------- ADD COMMENT ------------------------- //
export const actionAddCommentBlogAsync = (publicationId, comment) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Blog", publicationId);
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
                    dispatch(actionAddCommentBlogSyn(newComment));
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

const actionAddCommentBlogSyn = (payload) => {
    return {
        type: typesBlog.comment,
        payload,
    };
};

// ------------------ REMOVE COMMENT ------------------ //

export const actionRemoveCommentBlogAsync = (publicationId, commentId) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userUid = currentUser.uid;
                const publicationDocRef = doc(dataBase, "Blog", publicationId);
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
                        dispatch(actionRemoveCommentBlogSyn(pay));
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

const actionRemoveCommentBlogSyn = (payload) => {
    return {
        type: typesBlog.removeComment,
        payload,
    };
};