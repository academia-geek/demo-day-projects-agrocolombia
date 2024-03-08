import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import PrivateCheckRouter from './PrivateCheckRoutes'
import NewComers from '../Containers/Private/NewComers'
import LandingPage from '../Containers/Private/LandingPage'
import { actionListUserAsyn } from '../Redux/Actions/actionsUser'
import Search from '../Containers/Private/Search'
import Chats from '../Containers/Private/Chats'
import OpcVenta from '../Containers/Private/OpcVenta'
import VentaCombo from '../Containers/Private/VentaCombo'
import VentaProducto from '../Containers/Private/VentaProducto'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const auth = await dispatch(actionListUserAsyn())
                if (auth.uid) {
                    setUser(true)
                }
            } catch (error) {
                setUser(false)
            }
        }
        fetchUser()
    }, [])

    if (user === null) {
        return <div>Loading...</div>
    }


    return (
        <>
            <Routes>
                <Route path='/newcomer' element={<NewComers />}></Route>
                <Route path='/' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/chats' element={<PrivateCheckRouter isAutentication={user}><Chats /></PrivateCheckRouter>} />
                <Route path='/vende' element={<PrivateCheckRouter isAutentication={user}><OpcVenta /></PrivateCheckRouter>} />
                <Route path='/vende/producto' element={<PrivateCheckRouter isAutentication={user}><VentaProducto /></PrivateCheckRouter>} />
                <Route path='/vende/combo' element={<PrivateCheckRouter isAutentication={user}><VentaCombo /></PrivateCheckRouter>} />
                <Route path='/search/:term' element={<PrivateCheckRouter isAutentication={user}><Search /></PrivateCheckRouter>} />
                <Route path='/landingpage' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/*' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
            </Routes>
        </>
    )
}

export default Dashboard