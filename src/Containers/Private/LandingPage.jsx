import React, { useEffect } from "react";
import NavbarP from "../../Components/NavbarP";
import FiltrosNavbar from "../../Components/FiltrosNavbar";
import { useDispatch, useSelector } from "react-redux";
import { actionListproductAsyn } from "../../Redux/Actions/actionsProduct";
import FooterP from "../../Components/FooterP";

const LandingPage = () => {

  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
  }, [])

  return (
    <div>
      <NavbarP />
      <FiltrosNavbar />
      <div className="-z-10 p-10">
        <div className="carousel w-ful shadow-xl shadow-accent">
          <div id="slide1" className="carousel-item relative w-full">
            <img alt="" src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full rounded-xl" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide4" className="btn btn-circle">❮</a>
              <a href="#slide2" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img alt="" src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full rounded-xl" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">❮</a>
              <a href="#slide3" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img alt="" src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full rounded-xl" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">❮</a>
              <a href="#slide4" className="btn btn-circle">❯</a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img alt="" src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full rounded-xl" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-8 mt-6 ">
        <div className="bg-success p-7 rounded-lg text-center">
          <h1 className="text-2xl tracking-wide font-medium">Ofertas</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10">
          {products?.map((product) => (
            <div className="group card bg-base-100 shadow-xl shadow-success ">
              <figure>
                <img
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  src={product.media[0]}
                  alt={product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                  <div className="badge badge-success">OFERTA</div>
                </h2>
                <div style={{ display: "flex" }}>
                  <p className="text-gray-400 line-through">
                    ${product.price}
                  </p>
                  <p className="text-lime-500">
                    ${product.price}
                  </p>
                </div>
                <p>
                  {product.desc.charAt(0).toUpperCase() + product.desc.slice(1)}
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Temporada</div>
                  <div className="badge badge-outline">Verdura</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 py-8 mt-6 rounded-xl">
        <div className="bg-secondary p-7 rounded-lg text-center">
          <h1 className="text-2xl tracking-wide font-medium">Nuevos</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10">
          {products?.map((product) => (
            <div className="group card bg-base-100 shadow-xl shadow-secondary ">
              <figure>
                <img
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  src={product.media[0]}
                  alt={product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                  <div className="badge badge-secondary">Nuevo</div>
                </h2>
                <p>
                  ${product.price}
                </p>
                <p>
                  {product.desc.charAt(0).toUpperCase() + product.desc.slice(1)}
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Temporada</div>
                  <div className="badge badge-outline">Verdura</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 py-8 mt-6">
        <div className="bg-neutral p-7 rounded-lg text-center">
          <h1 className="text-2xl tracking-wide font-medium">Combos</h1>
        </div>
        <div className="mt-6 pb-6 card card-side bg-base-100 shadow-2xl shadow-neutral">
          <div style={{ width: 3000 }} className="mt-6 grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-1 px-10">
            <figure><img className="rounded-xl" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709566895/Guajolota/2021-04-19T18_54_56.661Z-papa-pastusa-paloquemao_1_q9a7ya.jpg" alt="Movie" /></figure>
            <figure><img className="rounded-xl" src="https://previews.123rf.com/images/deviddo/deviddo1603/deviddo160300136/53360769-la-zanahoria-en-una-pequeña-bolsa-en-la-mesa.jpg" alt="Movie" /></figure>
            <figure><img className="rounded-xl" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Romaine_lettuce.jpg/1200px-Romaine_lettuce.jpg" alt="Movie" /></figure>
            <figure><img className="rounded-xl" src="https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201909/26/00118166300170____1__600x600.jpg" alt="Movie" /></figure>
          </div>
          <div className="card-body">
            <h2 className="card-title">Combo Veggie</h2>
            <p>Este combo Veggie Fresh te ofrece una variedad de 4 productos frescos y de temporada, ideales para una alimentación saludable y llena de sabor. Disfruta de una explosión de vitaminas, minerales y fibra con cada bocado.

              Duración:

              Aproximadamente 5 días, siempre que se conserven en un lugar fresco y seco, como la nevera.

              Recomendaciones:

              Lava bien las verduras antes de consumirlas.
              Puedes consumirlas crudas en ensaladas, salteadas en woks, al horno o en cremas.
              Combina las verduras con diferentes proteínas y carbohidratos para crear platos completos y equilibrados.
              Lista de productos:

              Lechuga romana (1 unidad): Fresca y crujiente, ideal para ensaladas o wraps.
              Tomates perita (3 unidades): Deliciosos y jugosos, perfectos para ensaladas, salsas o gazpachos.
              Zanahorias (3 unidades): Versátiles y nutritivas, puedes consumirlas crudas, ralladas o cocidas.
              Pimientos rojos (2 unidades): Aportan sabor y color a tus platos, ideales para saltear, rellenar o asar.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Detalles</button>
            </div>
          </div>
        </div>
      </div>
      <FooterP/>
    </div>
  );
};

export default LandingPage;
