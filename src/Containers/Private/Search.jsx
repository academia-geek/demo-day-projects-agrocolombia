import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionSearchProductAsyn } from '../../Redux/Actions/actionsProduct';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';

const Search = () => {
  const dispatch = useDispatch();
  const { term } = useParams();

  // Search results and filtered products state
  const [searchResults, setSearchResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter state variables
  const [descuento, setDescuento] = useState(0);
  const [envio, setEnvio] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [consumo, setConsumo] = useState(null);

  // Filter function (consider creating a separate reusable component)
  const applyFilters = (products) => {
    return products.filter((product) => {
      let shouldInclude = true;

      // descuento: Include products with descuento greater than or equal to selected value
      if (descuento > 0 && product.descuento < descuento) {
        shouldInclude = false;
      }

      // envio: Check for exact match to desired shipping option
      if (envio === 1 && product.costoEnvio !== 0) {
        shouldInclude = false;
      } else if (envio === 0 && product.costoEnvio === 0) {
        shouldInclude = false;
      }
      // envio: Check for exact match to desired shipping option
      if (consumo !== null && product.consumo !== consumo) {
        shouldInclude = false;
      }
      // ubicacion: Check for exact match to desired location
      if (ubicacion && product.ubicacion !== ubicacion) {
        shouldInclude = false;
      }
      return shouldInclude;
    });
  };

  // Fetch and filter products on mount and filter updates
  useEffect(() => {
    const buscar = async () => {
      try {
        const datosEncontrados = await dispatch(actionSearchProductAsyn(term));
        setSearchResults(datosEncontrados);
        setFilteredProducts(applyFilters(datosEncontrados));
        console.log(applyFilters(datosEncontrados)) // Apply filters initially
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    buscar();
  }, [term, descuento, envio, ubicacion, consumo]);

  // Render filtered products
  return (
    <div>
      <NavbarP />
      <div>
        <p>Filtros</p>
        <hr />
        <p>Envio</p>
        <p onClick={() => setEnvio(null)}>Todos</p>
        <p onClick={() => setEnvio(1)}>Gratis</p>
        <p onClick={() => setEnvio(0)}>No gratis</p>
        <hr />
        <p>Ubicacion</p>
        <p onClick={() => setUbicacion(null)}>Todos</p>
        <p onClick={() => setUbicacion('bello')}>Bello</p>
        <p onClick={() => setUbicacion('medellin')}>Medellin</p>
        <hr />
        <p>Descuento</p>
        <p onClick={() => setDescuento(0)}>Desde 0%</p>
        <p onClick={() => setDescuento(10)}>Desde 10%</p>
        <p onClick={() => setDescuento(20)}>Desde 20%</p>
        <p onClick={() => setDescuento(30)}>Desde 30%</p>
        <p onClick={() => setDescuento(40)}>Desde 40%</p>
        <p onClick={() => setDescuento(50)}>Desde 50%</p>
        <hr />
        <p>Consumo</p>
        <p onClick={() => setConsumo(null)}>Todos</p>
        <p onClick={() => setConsumo(0)}>Inmediato</p>
        <p onClick={() => setConsumo(1)}>1 semana</p>
        <p onClick={() => setConsumo(2)}>2 semanas o mas</p>
        <hr />
      </div>
      {filteredProducts.length > 0 ? (
        <p>Resultados de la busqueda "{term}" {filteredProducts?.map((p,index) => (
          <p>{p.name}</p>
        ))}</p>
      ) : (
        <p>No se encontraron productos con los filtros aplicados.</p>
      )}
      <FooterP/>
    </div>
  );
};

export default Search;