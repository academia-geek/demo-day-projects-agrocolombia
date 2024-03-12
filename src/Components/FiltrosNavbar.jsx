import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { actionListproductAsyn } from '../Redux/Actions/actionsProduct';
import { actionListCombosAsyn } from '../Redux/Actions/actionsCombo';

const FiltrosNavbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
  }, [])

  // Usamos un conjunto (set) para almacenar las categorías únicas
  const categoriesSet = new Set();

  // Agregamos las categorías únicas al conjunto
  products?.forEach((p) => {
    p.categoria.forEach((c) => {
      categoriesSet.add(c);
    });
  });

  // Convertimos el conjunto en un array para poder mapear sobre él
  const categoriesArray = Array.from(categoriesSet);

  return (
    <div className="navbar justify-center">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/catalogo">Catalogo</Link></li>
          <li>
            <details>
              <summary>Categorias</summary>
              <ul className="p-2 z-10">
                {
                  categoriesArray.map((c, index) => (
                    <li key={`cats1${index}`} onClick={() => navigate(`/catalogo/${c}`)}>{c}</li>
                  ))
                }
              </ul>
            </details>
          </li>
          <li><Link to="/vende">Vender</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </div>
      <div className="navbar-center lg:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <button className='btn btn-accent'>Opciones</button>
          </div>
          <ul className="menu px-1 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-5">
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li>
              <details>
                <summary>Categorias</summary>
                <ul className="p-2 z-[1] flex flex-col gap-5">
                  {
                    categoriesArray.map((c, index) => (
                      <li key={`cats2${index}`} onClick={() => navigate(`/catalogo/${c}`)}>{c}</li>
                    ))
                  }
                </ul>
              </details>
            </li>
            <li><Link to="/vende">Vender</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FiltrosNavbar