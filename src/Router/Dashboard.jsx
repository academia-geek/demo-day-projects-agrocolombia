import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import PrivateCheckRouter from './PrivateCheckRoutes'
import NewComers from '../Containers/Private/NewComers'
import LandingPage from '../Containers/Private/LandingPage'
import { actionListUserAsyn } from '../Redux/Actions/actionsUser'
import Perfil from '../Components/Perfil'
import Search from '../Containers/Private/Search'
import Chats from '../Containers/Private/Chats'
import OpcVenta from '../Containers/Private/OpcVenta'
import VentaCombo from '../Containers/Private/VentaCombo'
import VentaProducto from '../Containers/Private/VentaProducto'
import MisVentas from '../Containers/Private/MisVentas'
import Blog from '../Containers/Private/Blog'
import BlogDetail from '../Containers/Private/BlogDetail'
import NuevoBlog from '../Containers/Private/NuevoBlog'
import MisBlogs from '../Containers/Private/MisBlogs'
import Catalogo from '../Containers/Private/Catalogo'
import ComprarProducto from '../Containers/Private/ComprarProducto'
import ComprarCombo from '../Containers/Private/ComprarCombo'
import Carrito from '../Containers/Private/Carrito'
import Pasarela from '../Containers/Private/Pasarela'
import PasarelaCard from '../Containers/Private/PasarelaCard'

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
                <Route path='/carrito' element={<Carrito />}></Route>
                <Route path='/perfil' element={<Perfil />}></Route>
                <Route path='/catalogo' element={<PrivateCheckRouter isAutentication={user}><Catalogo /></PrivateCheckRouter>} />
                <Route path='/catalogo/:filtro' element={<PrivateCheckRouter isAutentication={user}><Catalogo /></PrivateCheckRouter>} />
                <Route path='/chats' element={<PrivateCheckRouter isAutentication={user}><Chats /></PrivateCheckRouter>} />
                <Route path='/comprar-producto/:id' element={<PrivateCheckRouter isAutentication={user}><ComprarProducto /></PrivateCheckRouter>} />
                <Route path='/comprar-combo/:id' element={<PrivateCheckRouter isAutentication={user}><ComprarCombo /></PrivateCheckRouter>} />
                <Route path='/blog' element={<PrivateCheckRouter isAutentication={user}><Blog /></PrivateCheckRouter>} />
                <Route path='/mis-blogs' element={<PrivateCheckRouter isAutentication={user}><MisBlogs /></PrivateCheckRouter>} />
                <Route path='/nuevo-blog' element={<PrivateCheckRouter isAutentication={user}><NuevoBlog /></PrivateCheckRouter>} />
                <Route path='/blog-detaitl/:id' element={<PrivateCheckRouter isAutentication={user}><BlogDetail /></PrivateCheckRouter>} />
                <Route path='/mis-ventas' element={<PrivateCheckRouter isAutentication={user}><MisVentas /></PrivateCheckRouter>} />
                <Route path='/vende' element={<PrivateCheckRouter isAutentication={user}><OpcVenta /></PrivateCheckRouter>} />
                <Route path='/vende/producto' element={<PrivateCheckRouter isAutentication={user}><VentaProducto /></PrivateCheckRouter>} />
                <Route path='/vende/combo' element={<PrivateCheckRouter isAutentication={user}><VentaCombo /></PrivateCheckRouter>} />
                <Route path='/search/:term' element={<PrivateCheckRouter isAutentication={user}><Search /></PrivateCheckRouter>} />
                <Route path='/pasarela/:total' element={<PrivateCheckRouter isAutentication={user}><Pasarela /></PrivateCheckRouter>} />
                <Route path='/pasarelaCard' element={<PrivateCheckRouter isAutentication={user}><PasarelaCard /></PrivateCheckRouter>} />
                <Route path='/landingpage' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/*' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
            </Routes>
        </>
    )
}

export default Dashboard