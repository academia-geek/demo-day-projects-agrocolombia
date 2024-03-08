import React from 'react'
import { useNavigate } from 'react-router-dom'

const OpcVenta = () => {
    const navigate = useNavigate()

    return (
        <div>
            Escoje que quieres vender
            <div>
                <p onClick={() => navigate("/vende/producto")}>Producto</p>
                <p onClick={() => navigate("/vende/combo")}>Combo</p>
            </div>
        </div>
    )
}

export default OpcVenta