import React, { useEffect, useState } from "react";
import NavbarP from "../../Components/NavbarP";
import FiltrosNavbar from "../../Components/FiltrosNavbar";
import { useDispatch, useSelector } from "react-redux";
import { actionListproductAsyn } from "../../Redux/Actions/actionsProduct";
import FooterP from "../../Components/FooterP";
import { Carousel } from "react-responsive-carousel";
import { actionListCombosAsyn } from "../../Redux/Actions/actionsCombo";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { products } = useSelector((store) => store.productStore);
  const { combos } = useSelector((store) => store.combosStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
    dispatch(actionListCombosAsyn())
  }, [])
  const [detalles, setDetalles] = useState();
  
  const onClickItem = () => {
    
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
          <div className="flex items-center gap-7 bg-neutral p-7 rounded-t-lg text-center">
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
            <h1 className="text-2xl tracking-wide font-bold">OFERTAS</h1>
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10 pb-10 pt-4">
            {products?.map((product) => {
              if (product.descuento > 0) {
                return (
                  <div onClick={() => { navigate(`/comprar-producto/${product?.id}`) }} className="group card bg-base-100 shadow-xl shadow-neutral cursor-pointer  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                    <div className="h-3/6">
                      <img
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-t-lg"
                        src={product.media[0]}
                        alt={product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                      />
                    </div>
                    <div className="card-body min-h-3/6">
                      <h2 className="card-title">
                        {product?.name.charAt(0).toUpperCase() + product.name.slice(1)}
                        <div className="badge badge-success">OFERTA</div>
                      </h2>
                      <div style={{ display: "flex" }}>
                        {product?.descuento !== 0 ? (
                          <div className="flex gap-1">
                            <div className="flex gap-1">
                              <p className="text-gray-400 line-through">${product.price}</p>
                              <p>-{product.descuento}%</p>
                            </div>
                            <p className="text-lime-500">
                              ${(product.price - (product.price * (product.descuento / 100)))}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="">
                              ${product.price}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-justify line-clamp-3">
                          {product?.desc.charAt(0).toUpperCase() + product.desc.slice(1)}
                        </p>
                      </div>
                      <div className="card-actions justify-end">
                        {product?.categoria.map((cat) => (
                          <div className="badge badge-outline capitalize">{cat}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">{detalles?.name.charAt(0).toUpperCase() + detalles?.name.slice(1)}</h3>
                <figure>
                  <img
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    src={detalles?.media[0]}
                    alt={detalles?.name.charAt(0).toUpperCase() + detalles?.name.slice(1)}
                  />
                </figure>
                {detalles?.descuento > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <p className="text-gray-400 line-through -mr-5">
                      ${detalles?.price}
                    </p>
                    <p>
                      -{detalles?.descuento}%
                    </p>
                    <p className="text-lime-500">
                      ${(detalles?.price - (detalles?.price * (detalles?.descuento / 100))).toFixed(2)}
                    </p>
                  </div>
                )}
                {detalles?.descuento == 0 && (
                  <p className="text-center">
                    ${detalles?.price}
                  </p>
                )}
                <p style={{ textAlign: "center" }}>
                  {detalles?.desc.charAt(0).toUpperCase() + detalles?.desc.slice(1)}
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn" onClick={() => navigate(`/comprar-producto/${detalles?.id}`)}>Ver</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <div className="px-10 py-8 mt-6 rounded-xl">
        <div className="shadow-2xl shadow-neutral rounded-lg">
          <div className="flex items-center gap-7 bg-neutral p-7 rounded-t-lg text-center">
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
            <h1 className="text-2xl tracking-wide font-bold">NUEVOS</h1>
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 px-10 pb-10 pt-4">
            {products?.map((product) => (
              <div onClick={() => { navigate(`/comprar-producto/${product?.id}`) }} className="group card bg-base-100 shadow-xl shadow-neutral cursor-pointer  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="h-3/6">
                  <img
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-t-lg"
                    src={product.media[0]}
                    alt={product.name.charAt(0).toUpperCase() + product.name.slice(1)}
                  />
                </div>
                <div className="card-body min-h-3/6">
                  <h2 className="card-title">
                    {product?.name.charAt(0).toUpperCase() + product.name.slice(1)}
                    <div className="badge badge-primary">Nuevo</div>
                  </h2>
                  <div style={{ display: "flex" }}>
                    {product?.descuento !== 0 ? (
                      <div className="flex gap-1">
                        <div className="flex gap-1">
                          <p className="text-gray-400 line-through">${product.price}</p>
                          <p>-{product.descuento}%</p>
                        </div>
                        <p className="text-lime-500">
                          ${(product.price - (product.price * (product.descuento / 100)))}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="">
                          ${product.price}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-justify line-clamp-3">
                      {product?.desc.charAt(0).toUpperCase() + product.desc.slice(1)}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    {product?.categoria.map((cat) => (
                      <div className="badge badge-outline capitalize">{cat}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>

      <div className="px-10 py-8 mt-6">
        <div className="shadow-2xl shadow-neutral rounded-lg ">
          <div className="flex items-center gap-7 bg-neutral p-7 rounded-t-lg text-center ">
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
            <h1 className="text-2xl tracking-wide font-bold">COMBOS</h1>
            <div className="border-2 w-full h-0 border-primary rounded-2xl"></div>
          </div>
          <Carousel showArrows={true} interval={10000} stopOnHover={true} infiniteLoop emulateTouch autoPlay showThumbs={false} onClickItem={() => onClickItem()}>
            {combos?.slice(0, 5).map((c, index) => (
              <div key={index} className="py-10 px-5 flex flex-col">
                <div className="grid-cols-4 gap-4 justify-items-stretch hidden lg:grid">
                  {c.media && c.media.slice(0, 4).map((img, i) => (
                    <div className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                      <img key={i} className="lg:size-56 md:size-32 object-cover  rounded-lg" src={img} alt="Movie" />
                    </div>
                  ))}
                </div>
                <div className="lg:hidden">
                  <Carousel infiniteLoop autoPlay showThumbs={false}>
                    {c.media && c.media.slice(0, 4).map((img, i) => (
                      <img key={i} className="size-56 object-contain" src={img} alt="Movie" />
                    ))}
                  </Carousel>
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <h2 className="text-xl font-bold text-center">{c.name}</h2>
                  <p className="text-justify line-clamp-3">{c.desc}</p>
                  <div className="">
                    <button className="btn btn-primary" onClick={() => navigate(`/comprar-combo/${c?.id}`)}>Detalles</button>
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
