import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../Config/FireBase/fireBaseConfig";
import { typesChats } from "../Types/types";
import { actionSearchUserAsync } from "./actionsUser";

export const actionFindChatAsync = () => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            if (auth && auth.currentUser) {
                const uid = auth.currentUser.uid;
                const chatQuery = query(
                    collection(dataBase, "Chats"),
                    where("uid1", "==", uid)
                );
                const chatQuery2 = query(
                    collection(dataBase, "Chats"),
                    where("uid2", "==", uid)
                );
                const chatSnapshot = await getDocs(chatQuery);
                const chatSnapshot2 = await getDocs(chatQuery2);
                if (chatSnapshot) {
                    let chats = chatSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    chats = chats.concat(chatSnapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                    dispatch(actionFindChatsync(chats));
                    return chats;
                } else {
                    console.warn("No se encontraron chats.");
                }
            } else {
                console.warn("No esta uthenticado");
            }
        } catch (error) {
            console.error("Error al obtener los chats:", error);
        }
    };
};

const actionFindChatsync = (payload) => {
    return {
        type: typesChats.list,
        payload
    };
};

export const actionAddMessageToChatAsync = (chatId, message) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            if (auth && auth.currentUser) {
                const collectionRef = collection(dataBase, "Chats");
                const q = query(collectionRef, where("id", "==", chatId));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const chatDocRef = doc(dataBase, "Chats", querySnapshot.docs[0].id);
                    await updateDoc(chatDocRef, {
                        mensajes: arrayUnion({
                            uid: auth.currentUser.uid,
                            mensaje: message
                        })
                    });
                    const obj = {
                        chatId: chatId,
                        mensaje: message,
                        uid: auth.currentUser.uid
                    };
                    dispatch(actionAddMessageToChatSync(obj));
                    dispatch(actionFindChatAsync())
                    console.log("Mensaje agregado correctamente.");
                } else {
                    console.warn("No se encontró el chat con ID", chatId);
                }
            } else {
                console.warn("No se encontró el usuario.");
            }
        } catch (error) {
            console.error("Error al agregar el mensaje al chat:", error);
        }
    };
};

const actionAddMessageToChatSync = (payload) => {
    return {
        type: typesChats.addMessage,
        payload
    };
};

// ------------------Seacrh--------------------------
export const actionChatProductAsyn = (payload) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            const uid = auth.currentUser.uid;
            const chatId = payload.chatId;
            const docRef = doc(dataBase, "Chats", chatId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const chatData = docSnap.data();
                const uid1 = chatData.uid1;
                const uid2 = chatData.uid2;
                if (uid1 !== uid && uid2 !== uid) {
                    const user1 = await dispatch(actionSearchUserAsync(uid1));
                    const user2 = await dispatch(actionSearchUserAsync(uid2));
                    if (user1 && user2) {
                        const filteredChats = [user1, user2].filter((user) => {
                            const name = `${user.firstName} ${user.lastName}`;
                            return name.toLowerCase().includes(payload.toLowerCase());
                        });
                        dispatch(actionSearchChatSyn(filteredChats));
                    } else {
                        console.warn("No se encontraron usuarios con ese nombre.");
                    }
                } else {
                    console.warn("El usuario actual no puede buscar chats consigo mismo.");
                }
            } else {
                console.warn("No se encontró el documento del chat.");
            }
        } catch (error) {
            console.error("Error al buscar chats:", error);
        }
    };
};

export const actionSearchChatSyn = (payload) => {
    return {
        type: typesChats.search,
        payload,
    };
};

// ----------------Eliminar Productos-----------------------

export const actionDeleteProductAsyn = (payload) => {
    return async (dispatch) => {
        const productosCollection = collection(dataBase, "Chats");
        const q = query(productosCollection, where("id", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Chats", docu.id));
        });
        dispatch(actionDeleteProductSyn(payload));
        dispatch(actionFindChatAsync());
    };
};

export const actionDeleteProductSyn = (payload) => {
    return {
        type: typesChats.delete,
        payload,
    };
};

// ------------------Agregar---------------------
export const actionStartChatAsyn = (payload) => {
    return async (dispatch) => {
        try {
            const auth = getAuth();
            if (auth && auth.currentUser) {
                const uid = auth.currentUser.uid;
                const existingChatQuery = query(
                    collection(dataBase, "Chats"),
                    where("uid1", "==", uid),
                    where("uid2", "==", payload)
                );
                const existingChatDocs = await getDocs(existingChatQuery);
                if (existingChatDocs.docs.length > 0) {
                    return true; 
                }
                const obj = {
                    id: crypto.randomUUID(),
                    messages: [],
                    uid1: uid,
                    uid2: payload
                };
                await addDoc(collection(dataBase, "Chats"), obj);
                dispatch(actionStartChatSyn(payload));
            } else {
                console.warn("User not auth");
            }
        } catch (error) {
            console.error("Error starting chat:", error);
            return false;
        }
    };
};

export const actionStartChatSyn = (payload) => {
    return {
        type: typesChats.new,
        payload,
    };
};