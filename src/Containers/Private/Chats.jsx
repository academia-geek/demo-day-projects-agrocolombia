import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionAddMessageToChatAsync, actionFindChatAsync } from '../../Redux/Actions/actionsChat'
import { actionListUserAsyn, actionListUserUidAsyn } from '../../Redux/Actions/actionsUser'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { getAuth } from 'firebase/auth'

const Chats = () => {
    const user = getAuth()
    const dispatch = useDispatch()
    const { chats } = useSelector(state => state.chatStore)
    const { userData } = useSelector(state => state.userStore)
    const { resultSearch } = useSelector(state => state.resultStore)
    const [data, setData] = useState([]);
    const [chatsActual, setChatsActual] = useState()
    const [chatInput, setChatInput] = useState('')
    const [indexC, setIndexC] = useState()

    const func = () => {
        chats.map((c, index) => {
            if (c.uid1 === userData.uid) {
                dispatch(actionListUserUidAsyn(c.uid2))
            } else {
                dispatch(actionListUserUidAsyn(c.uid1))
            }
        })
    }

    useEffect(() => {
        dispatch(actionFindChatAsync())
        dispatch(actionListUserAsyn())
    }, [])

    useEffect(() => {
        func()
    }, [chats])


    /// TODO: ORGANIZAR ACA
    useEffect(() => {
        if (resultSearch) {
            const isDuplicate = data.some(item => item.uid === resultSearch.uid);

            if (!isDuplicate) {
                setData(prevData => [resultSearch, ...prevData]);
            }
        }
    }, [resultSearch])

    //CHAT

    const handleChatSubmit = async (e) => {
        e.preventDefault()
        await dispatch(actionAddMessageToChatAsync(chats[indexC].id, chatInput))
        setChatInput('')
    }

    const handleChatChange = (e) => {
        setChatInput(e.target.value)
    }

    const handleChatKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleChatSubmit(e)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(actionFindChatAsync())
            dispatch(actionListUserAsyn())
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen">
            <NavbarP />
            <div className='h-[90vh] flex lg:flex-row flex-col justify-between'>
                <div className='w-full h-full lg:w-3/12 bg-accent px-4 pb-4 lg:pb-4"'>
                    <div className='outline h-full rounded-lg p-2 pt-6 bg-white flex flex-col gap-5'>
                        {
                            data?.map((c, index) => (
                                <div className='flex gap-3 items-center p-3 bg-accent rounded-lg' key={index} onClick={() => { setChatsActual(c);setIndexC(index);}}>
                                    <img className='size-14 object-cover' src={c.fotoUrl} alt="" />
                                    <p className='text-2xl font-bold line-clamp-2'>{c.firstName} {c.lastName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-9/12">
                    {chatsActual ?
                        <div className='h-full flex flex-col'>
                            <div className='flex gap-3 items-center border-b-8 border-black'>
                                <img className='size-20' src={chatsActual.fotoUrl} alt="" />
                                <p className='text-2xl font-bold'>{chatsActual.firstName} {chatsActual.lastName}</p>
                            </div>
                            <div className='p-5 flex flex-col h-full overflow-auto  justify-between'>
                                <div className='flex flex-col gap-5 h-5/6 overflow-y-auto '>
                                    {chats[indexC]?.mensajes?.map((m, index) => {
                                        if (m.uid === user.currentUser.uid) {
                                            return (
                                                <div key={index}>
                                                    <div className="chat chat-end">
                                                        <div className="chat-image avatar">
                                                            <div className="w-10 rounded-full">
                                                                <img alt="Tailwind CSS chat bubble component" src={userData.fotoUrl} />
                                                            </div>
                                                        </div>
                                                        <div className="chat-bubble">{m.mensaje}</div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={index}>
                                                    <div className="chat chat-start">
                                                        <div className="chat-image avatar">
                                                            <div className="w-10 rounded-full">
                                                                <img alt="Tailwind CSS chat bubble component" src={chatsActual.fotoUrl} />
                                                            </div>
                                                        </div>
                                                        <div className="chat-bubble">{m.mensaje}</div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                                <input type='text' value={chatInput}
                                    onChange={handleChatChange}
                                    className='input input-bordered'
                                    onKeyPress={handleChatKeyPress}
                                    placeholder='Ab...'></input>
                            </div>
                        </div> : 
                        <div className='h-full w-full flex justify-center place-items-center'>
                            <p className='text-3xl'>Aun no has seleccionado un chat</p>
                        </div>}
                </div>
            </div>
            <FooterP />
        </div>
    )
}

export default Chats