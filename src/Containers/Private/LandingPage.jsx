import React, { useEffect, useState } from "react";
import NavbarP from "../../Components/NavbarP";
import FiltrosNavbar from "../../Components/FiltrosNavbar";
import { useDispatch, useSelector } from "react-redux";
import { actionListproductAsyn } from "../../Redux/Actions/actionsProduct";
import FooterP from "../../Components/FooterP";
import { Carousel } from "react-responsive-carousel";

const LandingPage = () => {

  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
  }, [])

  const onClickItem = () => {
    console.warn("si")
  }

  return (
    <div>
      <NavbarP />
      <FiltrosNavbar />
      <div className="-z-10 p-10">
        <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false} onClickItem={() => onClickItem()}>
          <div>
            <img style={{ height: 400, objectFit: "cover" }} className="rounded-lg" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt='' />
          </div>
          <div>
            <img style={{ height: 400, objectFit: "cover" }} className="rounded-lg" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt='' />
          </div>
          <div>
            <img style={{ height: 400, objectFit: "cover" }} className="rounded-lg" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt='' />
          </div>
        </Carousel>
      </div>
      <div className="px-10 py-8 mt-6 ">
        <div className="shadow-2xl shadow-neutral rounded-lg">
          <div className="bg-neutral p-7 rounded-t-lg text-center">
            <h1 className="text-2xl tracking-wide font-medium">Ofertas</h1>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10 pb-10">
            {products?.map((product) => {
              if (product.descuento > 0) {
                return (
                  <div className="group card bg-base-100 shadow-xl shadow-neutral ">
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
                        <p className="text-gray-400 line-through -mr-5">
                          ${product.price}
                        </p>
                        <p>
                          -{product.descuento}%
                        </p>
                        <p className="text-lime-500">
                          ${(product.price - (product.price*(product.descuento/100)))}
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
                )
              }
            })}
          </div>
        </div>
      </div>

      <div className="px-10 py-8 mt-6 rounded-xl">
        <div className="shadow-2xl shadow-neutral rounded-lg">
          <div className="bg-neutral p-7 rounded-t-lg text-center">
            <h1 className="text-2xl tracking-wide font-medium">Nuevos</h1>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10 pb-10">
            {products?.map((product) => (
              <div className="group card bg-base-100 shadow-xl shadow-neutral ">
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
      </div>

      <div className="px-10 py-8 mt-6">
        <div className="shadow-2xl shadow-neutral rounded-lg">
          <div className="bg-neutral p-7 rounded-t-lg text-center">
            <h1 className="text-2xl tracking-wide font-medium">Combos</h1>
          </div>
          <div className="mt-6 pb-6 card card-side bg-base-100 ">
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
      </div>
      <FooterP />
    </div>
  );
};

export default LandingPage;
