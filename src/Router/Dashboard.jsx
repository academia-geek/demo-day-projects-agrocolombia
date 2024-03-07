import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import PrivateCheckRouter from './PrivateCheckRoutes'
import NewComers from '../Containers/Private/NewComers'
import LandingPage from '../Containers/Private/LandingPage'
import { actionListUserAsyn } from '../Redux/Actions/actionsUser'
import Perfil from '../Components/Perfil'

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
                <Route path='/landingpage' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/*' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/perfil' element={<Perfil />}></Route>
            </Routes>
        </>
    )
}

export default Dashboard