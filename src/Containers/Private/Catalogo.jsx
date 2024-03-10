import React, { useEffect, useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { useDispatch, useSelector } from 'react-redux'
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct'
import { actionListCombosAsyn } from '../../Redux/Actions/actionsCombo'
import { useNavigate } from 'react-router-dom'

const Catalogo = () => {

  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);
  const { combos } = useSelector((store) => store.combosStore);
  const [filtrados, setFiltrados] = useState()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(actionListproductAsyn())
    dispatch(actionListCombosAsyn())
  }, [])


  // Filter state variables
  const [descuento, setDescuento] = useState(0);
  const [envio, setEnvio] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [consumo, setConsumo] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900000000000);
  const [categoria, setCategoria] = useState(null);

  const applyFilters = (products) => {
    return products.filter((product) => {
      let shouldInclude = true;

      if (descuento > 0 && product.descuento < descuento) {
        shouldInclude = false;
      }

      if (envio === 1 && product.costoEnvio !== 0) {
        shouldInclude = false;
      } else if (envio === 0 && product.costoEnvio === 0) {
        shouldInclude = false;
      }

      if (product.price < minPrice || product.price > maxPrice) {
        shouldInclude = false;
      }


      if (ubicacion && product.ubicacion !== ubicacion) {
        shouldInclude = false;
      }


      if (consumo !== null && product.consumo !== consumo) {
        shouldInclude = false;
      }

      if (categoria !== null && !product.categoria.includes(categoria)) {
        shouldInclude = false;
      }

      return shouldInclude;
    });
  };

  useEffect(() => {
    const buscar = async () => {
      try {
        setFiltrados(applyFilters(products));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    buscar();
  }, [descuento, envio, ubicacion, consumo, minPrice, maxPrice, categoria]);

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
    <div>
      <NavbarP/>
      <div className='container mx-auto flex'>
        <div className='bg-accent min-h-screen w-3/12 px-7 pb-10'>
          <div className='outline h-full rounded-lg p-2 bg-base'>
            <p className='text-3xl'>Filtros</p>
            <div className='flex flex-col gap-5'>
              <div>
                <p>Envio</p>
                <div className="join join-vertical ml-3">
                  <input onClick={() => setEnvio(null)} className="join-item btn" type="radio" name="envio" aria-label="Toodos" />
                  <input onClick={() => setEnvio(1)} className="join-item btn" type="radio" name="envio" aria-label="Gratis" />
                  <input onClick={() => setEnvio(0)} className="join-item btn" type="radio" name="envio" aria-label="Con costo" />
                </div>
              </div>
              <div>
                <p>Precio</p>
                <div className="flex flex-col ml-3">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="input input-bordered mr-2 w-full max-w-xs"
                    placeholder="Mínimo"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Máximo"
                  />
                </div>
              </div>
              <div>
                <p>Ubicacion</p>
                <div className="join join-vertical ml-3">
                  <input onClick={() => setUbicacion(null)} className="join-item btn" type="radio" name="ubicacion" aria-label="Todos" />
                  <input onClick={() => setUbicacion('bello')} className="join-item btn" type="radio" name="ubicacion" aria-label="Bello" />
                  <input onClick={() => setUbicacion('medellin')} className="join-item btn" type="radio" name="ubicacion" aria-label="Medellin" />
                  <input onClick={() => setUbicacion('copacabana')} className="join-item btn" type="radio" name="ubicacion" aria-label="Copacabana" />
                  <input onClick={() => setUbicacion('barbosa')} className="join-item btn" type="radio" name="ubicacion" aria-label="Barbosa" />
                  <input onClick={() => setUbicacion('cisneros')} className="join-item btn" type="radio" name="ubicacion" aria-label="Cisneros" />
                </div>
              </div>
              <div>
                <p>Descuento</p>
                <div className="join join-vertical ml-3">
                  <input onClick={() => setDescuento(0)} className="join-item btn" type="radio" name="descuento" aria-label="Sin descuento" />
                  <input onClick={() => setDescuento(10)} className="join-item btn" type="radio" name="descuento" aria-label="Desde 10%" />
                  <input onClick={() => setDescuento(20)} className="join-item btn" type="radio" name="descuento" aria-label="Desde 20%" />
                  <input onClick={() => setDescuento(30)} className="join-item btn" type="radio" name="descuento" aria-label="Desde 30%" />
                  <input onClick={() => setDescuento(40)} className="join-item btn" type="radio" name="descuento" aria-label="Desde 40%" />
                </div>
              </div>
              <div>
                <p>Consumo</p>
                <div className="join join-vertical ml-3">
                  <input onClick={() => setConsumo(null)} className="join-item btn" type="radio" name="consumo" aria-label="Todos" />
                  <input onClick={() => setConsumo(0)} className="join-item btn" type="radio" name="consumo" aria-label="Inmediato" />
                  <input onClick={() => setConsumo(1)} className="join-item btn" type="radio" name="consumo" aria-label="2 Semanas" />
                  <input onClick={() => setConsumo(2)} className="join-item btn" type="radio" name="consumo" aria-label="1 Mes o mas" />
                </div>
              </div>
              <div>
                <p>Categorias</p>
                <div className="join join-vertical ml-3">
                  <input onClick={() => setCategoria(null)} className="join-item btn" type="radio" name="categorias" aria-label="Todos" />
                  {console.log(categoriesArray)}
                  {categoriesArray?.map((c,index) => (
                    <input onClick={() => setCategoria(c)} className="join-item btn" type="radio" name="categorias" aria-label={c} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='p-10 w-9/12'>
          <div className="mt-6 px-10 pb-10">
            {filtrados?.map((p,index) => (
              <div className="flex bg-accent mb-10 p-5 rounded-lg">
                  <img
                    className="object-contain object-center"
                    src={p.media[0]}
                    style={{width: 200, height: 200}}
                    alt={p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  />
                <div className="card-body">
                  <h2 className="card-title">
                    {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                    {p.descuento > 0 && (
                      <div>
                        <div className="badge badge-secondary">Descuento</div>
                      </div>
                    )}
                  </h2>
                  <p>
                    {p.descuento > 0 && (
                      <div>
                        <span className="text-base text-secondary mr-3 line-through">${p.price}</span>
                        <span className="text-base text">${(p.price - (p.price * (p.descuento / 100)))}</span>
                      </div>
                    )}
                    {p.descuento === "0" && (
                      <span className="text-base">${p.price}</span>
                    )}
                  </p>
                  <p>
                    {p.desc.charAt(0).toUpperCase() + p.desc.slice(1)}
                  </p>
                  <button className="btn w-fit btn-primary" onClick={() => navigate(`/comprar-producto/${p?.id}`)}>Ver</button>
                  <div className="card-actions justify-end">
                    {
                      p.categoria.map((c)=>(
                        <div onClick={() => setCategoria(c)} className="badge badge-outline cursor-pointer">{c}</div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterP/>
    </div>
  )
}

export default Catalogo