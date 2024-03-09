import React from 'react'
import { Link } from 'react-router-dom'

const FiltrosNavbar = () => {
  return (
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><p>Ofertas</p></li>
            <li>
              <p>Categorias</p>
              <ul className="p-2">
                <li><p>Submenu 1</p></li>
                <li><p>Submenu 2</p></li>
              </ul>
            </li>
            <li><p>Historial</p></li>
            <li><p>Vender</p></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><p>Ofertas</p></li>
          <li>
            <details>
              <summary>Categorias</summary>
              <ul className="p-2 z-10">
                <li><p>Submenu 1</p></li>
                <li><p>Submenu 2</p></li>
              </ul>
            </details>
          </li>
          <li><Link to="/vende">Vender</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  )
}

export default FiltrosNavbar
