import React from 'react'

const FiltrosNavbar = () => {
  return (
    <div className="navbar bg-base-300">
  <div className="navbar-start">
    <div className="dropdown">
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Ofertas</a></li>
        <li>
          <a>Categorias</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Historial</a></li>        
        <li><a>Vender</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Ofertas</a></li>
      <li>
        <details>
          <summary>Categorias</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Historial</a></li>      
      <li><a>Vender</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    
  </div>
</div>
  )
}

export default FiltrosNavbar
