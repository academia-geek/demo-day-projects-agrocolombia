import React, { useEffect, useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { useDispatch } from 'react-redux'
import { actionFindChatAsync } from '../../Redux/Actions/actionsChat'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { actionListUserAsyn, actionListUserUidAsyn } from '../../Redux/Actions/actionsUser'

const Chats = () => {

    const user = getAuth()
    const [users, setUsers] = useState()
    const [usuarioP, setUsuarioP] = useState()
    const dispatch = useDispatch()
    const [chats, setChats] = useState()
    const [chatsActual, setChatsActual] = useState()
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        const func = async () => {
            let datosUsuarios = []
            const datos = await dispatch(actionFindChatAsync())
            console.log(datos)
            setChats(datos)
            setUsuarioP(await actionListUserAsyn())
            if (!users) {
                datos.map(async (c,index) => {
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
        }
        func()

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchInput)
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div>
            <NavbarP />
            <input
                type="text"
                placeholder="Busca tu chat"
                className="input input-bordered w-96"
                value={searchInput}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            {
                users?.map((c,index) => (
                    <div key={index} value={index} onClick={() => setChatsActual(c)}>
                        <p>{c.firstName}</p>
                        <p>{c.lastName}</p>
                        <img className='size-14' src={c.fotoUrl} alt="" />
                    </div>
                ))
            }
            {chatsActual ? 
            <div>
                <div>
                    <p>{chatsActual.firstName}</p>
                    <p>{chatsActual.lastName}</p>
                    <img className='size-14' src={chatsActual.fotoUrl} alt="" />
                </div>
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
                    </div>
            </div> : <div><p>Escoja su chat</p></div>}
            <FooterP />
        </div>
    )
}

export default Chats