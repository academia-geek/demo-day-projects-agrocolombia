import React, { useEffect, useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { useDispatch } from 'react-redux'
import { actionAddMessageToChatAsync, actionFindChatAsync } from '../../Redux/Actions/actionsChat'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { actionListUserAsyn, actionListUserUidAsyn } from '../../Redux/Actions/actionsUser'

const Chats = () => {

    const user = getAuth()
    const [users, setUsers] = useState()
    const [usuarioP, setUsuarioP] = useState()
    const dispatch = useDispatch()
    const [chatsActual, setChatsActual] = useState()
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')
    const [chatInput, setChatInput] = useState('')
    const [activer, setActiver] = useState(true)

    useEffect(() => {
        const func = async () => {
            let datosUsuarios = []
            const datos = await dispatch(actionFindChatAsync())
            const userData = await dispatch(actionListUserAsyn())
            if (!users) {
                datos.map(async (c, index) => {
                    if (c.uid1 !== user.currentUser.uid) {
                        let user2 = await dispatch(actionListUserUidAsyn(c.uid1))
                        user2 = {
                            ...user2,
                            chat: {
                                ...c
                            }
                        }
                        console.log(user2)
                        datosUsuarios.push(user2)
                    }
                    if (c.uid2 !== user.currentUser.uid) {
                        let user2 = await dispatch(actionListUserUidAsyn(c.uid2))
                        user2 = {
                            ...user2,
                            chat: {
                                ...c
                            }
                        }
                        datosUsuarios.push(user2)
                    }
                })
                setUsers(datosUsuarios)
            }
            setUsuarioP(userData)
        }
        func()

    }, [setActiver])

    //CHAT

    const handleChatSubmit = async (e) => {
        e.preventDefault()
        await dispatch(actionAddMessageToChatAsync(chatsActual.chat.id,chatInput))
        setActiver(!activer)
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
                users?.map((c, index) => (
                    <div key={index} value={index} onClick={() => setChatsActual(c)}>
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
                        {chatsActual.chat.mensajes.map((m, index) => {
                            if (m.uid === user.currentUser.uid) {
                                return (
                                    <div key={index}>
                                        <img className='size-14' src={usuarioP.fotoUrl} alt="" />
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