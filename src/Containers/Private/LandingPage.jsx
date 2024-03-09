import React, { useEffect, useState } from "react";
import NavbarP from "../../Components/NavbarP";
import FiltrosNavbar from "../../Components/FiltrosNavbar";
import { useDispatch, useSelector } from "react-redux";
import { actionListproductAsyn } from "../../Redux/Actions/actionsProduct";
import FooterP from "../../Components/FooterP";
import { Carousel } from "react-responsive-carousel";
import { actionListCombosAsyn } from "../../Redux/Actions/actionsCombo";

const LandingPage = () => {

  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);
  const { combos } = useSelector((store) => store.combosStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
    dispatch(actionListCombosAsyn())
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
          <Carousel showArrows={true} interval={10000} stopOnHover={true} infiniteLoop emulateTouch autoPlay showThumbs={false} onClickItem={() => onClickItem()}>
            {combos?.slice(0, 5).map((c, index) => (
              <div key={index} className="mt-6 pb-6 card card-side bg-base-100 ">
                <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-1 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-1 px-10">
                  {c.media && c.media.slice(0, 4).map((img, i) => (
                    <img key={i} style={{ width: 200, height: 200, objectFit: "contain" }} className="rounded-xl" src={img} alt="Movie" />
                  ))}
                </div>
                <div className="card-body">
                  <h2 className="card-title">{c.name}</h2>
                  <p>{c.desc}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Detalles</button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <FooterP />
    </div>
  );
};

export default LandingPage;
