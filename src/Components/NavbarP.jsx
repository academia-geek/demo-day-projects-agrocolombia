import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogoutAsyn } from "../Redux/Actions/actionsLogin";
import { actionListUserAsyn } from "../Redux/Actions/actionsUser";
import { Link, useNavigate } from "react-router-dom";

const NavbarP = () => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userStore)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(actionListUserAsyn())

  }, [])

  const logOutClick = () => {
    navigate("/")
    dispatch(actionLogoutAsyn())
  }


  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "mytheme")

  useEffect(() => {
    localStorage.setItem("theme", theme)
    const localTheme = localStorage.getItem("theme")
    document.querySelector("html").setAttribute("data-theme", localTheme)
  }, [theme])

  const handleToogleTheme = (e) => {
    if (e.target.checked) {
      setTheme("forest")
    } else {
      setTheme("mytheme")
    }
  }

  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchInput}`)
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
    <div className="navbar bg-accent">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-44 md:w-auto"
                value={searchInput}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </ul>
        </div>
        <img style={{ cursor: "pointer" }} onClick={() => navigate("/*")} alt="icon" className="size-12" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709572838/Guajolota/logo_tayiwj.png"></img>
        <Link to="/*" className="btn btn-ghost text-xl">AgroColombia</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <ul className="menu menu-horizontal px-1">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-96"
              value={searchInput}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </ul>
      </div>
      <div className="navbar-end">
        <div>
          <img onClick={() => navigate("/chats")} className="btn btn-ghost btn-circle cursor-pointer" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709846420/Guajolota/1380370_nqvo2f.png" alt="" />
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Foto perfil"
                  src={userData?.fotoUrl || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label className="flex cursor-pointer gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                  <input onChange={handleToogleTheme} type="checkbox" value="synthwave" className="toggle theme-controller" checked={theme === "forest" ? true : false} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
              </li>
              <li>
                <a className="justify-between">
                  Perfil
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link to="/mis-ventas">Mis ventas</Link>
              </li>
              <li>
                <p>Mis compras</p>
              </li>
              <li>
                <p>Configuracion</p>
              </li>
              <li onClick={() => logOutClick()}>
                <p>Cerrar sesión</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarP;
