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

    useEffect(() => {
        if (resultSearch) {
            const isDuplicate = data.some(item => item.uid === resultSearch.uid);

            if (!isDuplicate) {
                setData(prevData => [...prevData, resultSearch]);
            }
        }
    }, [resultSearch])

    //CHAT

    const handleChatSubmit = async (e) => {
        e.preventDefault()
        console.log(chats[indexC])
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

    return (
        <div>
            <NavbarP />
            {
                data?.map((c,index) => (
                    <div key={index} onClick={() => { setChatsActual(c); setIndexC(index); console.log(c)}}>
                        <p>{c.firstName}</p>
                        <p>{c.lastName}</p>
                        <img className='size-14' src={c.fotoUrl} alt="" />
                    </div>
                ))
            }
            <hr />
            {chatsActual ?
                <div>
                    <div>
                        <p>{chatsActual.firstName}</p>
                        <p>{chatsActual.lastName}</p>
                        <img className='size-14' src={chatsActual.fotoUrl} alt="" />
                    </div>
                    <hr />
                    <div>
                        {chats[indexC].mensajes?.map((m, index) => {
                            if (m.uid === user.currentUser.uid) {
                                return (
                                    <div key={index}>
                                        <img className='size-14' src={userData.fotoUrl} alt="" />
                                        <p>{m.mensaje}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index}>
                                        <img className='size-14' src={chatsActual.fotoUrl} alt="" />
                                        <p>{m.mensaje}</p>
                                    </div>
                                );
                            }
                        })}
                        <input type='text' value={chatInput}
                            onChange={handleChatChange}
                            onKeyPress={handleChatKeyPress}
                            placeholder='Ab...'></input>
                    </div>
                </div> : <div><p>Escoja su chat</p></div>}
            <FooterP />
        </div>
    )
}

export default Chats