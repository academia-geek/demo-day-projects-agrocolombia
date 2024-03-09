import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { actionListproductAsyn } from '../Redux/Actions/actionsProduct';
import { actionListCombosAsyn } from '../Redux/Actions/actionsCombo';

const FiltrosNavbar = () => {

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
    <div className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li>
              <p>Categorias</p>
              <ul className="p-2">
                {
                  categoriesArray.map((c, index) => (
                    <Link to={`/catalogo/${c}`} key={index}><p>{c}</p></Link>
                  ))
                }
              </ul>
            </li>
            <li><p>Historial</p></li>
            <li><p>Vender</p></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/catalogo">Catalogo</Link></li>
          <li>
            <details>
              <summary>Categorias</summary>
              <ul className="p-2 z-10">
                {
                  categoriesArray.map((c, index) => (
                    <Link to={`/catalogo/${c}`} key={index}><p>{c}</p></Link>
                  ))
                }
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