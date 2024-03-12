import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../Helpers/FileUpload";
import { actionEditUserAsyn, actionListUserAsyn } from "../Redux/Actions/actionsUser";
import useForm from "../Hooks/useForm";

const Perfil = () => {
  const navigate = useNavigate()
  const { userData } = useSelector(state => state.userStore)
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    dispatch(actionListUserAsyn())
  }, [])

  const [formValue, handleInputChange, reset] = useForm({
    firstName: userData.firstName,
    lastName: userData.lastName,
    fotoUrl: userData.fotoUrl,
    extra: userData.address.extra,
    main: userData.address.main,
    blogs: userData.blogs,
    combos: userData.combos,
    idCart: userData.idCart,
    products: userData.products,
    uid: userData.uid
  });

  //CAMBIAR LA URL POR LA QUE DE CLOUDINARY

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      fotoUrl: formValue.fotoUrl,
      address: {
        extra: formValue.extra,
        main: formValue.main
      },
      blogs: formValue.blogs,
      combos: formValue.combos,
      idCart: formValue.idCart,
      products: formValue.products,
      uid: formValue.uid
    };
    console.log(obj)
    dispatch(actionEditUserAsyn(obj));
    document.getElementById('my_modal_5').close()
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsImageLoading(true);
    FileUpload(file)
      .then((resp) => {
        formValue.fotoUrl = resp
        setIsImageLoading(false);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="font-sans antialiased text-base leading-normal tracking-wider" style={{ backgroundImage: "https:res.cloudinary.com/dyepe4ih7/image/upload/v1709825962/socialmedia/fldldxxk7zwcmogluzqp.png" }}>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          className="p-5 w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div
            className="p-4 md:p-12 text-center lg:text-left rounded-lg"
            style={{ backgroundColor: "#B0B0B0" }}
          >
            <div className="flex lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
              <img
                alt=""
                src={userData?.fotoUrl}
                className="lg:hidden rounded-full shadow-xl mx-auto  h-48 w-48 bg-cover bg-center"
              />
            </div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-gray-900">{userData?.firstName} {userData?.lastName}</h1>

            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <img alt="" className="h-4 fill-current text-green-700 pr-4" src="https:res.cloudinary.com/dyepe4ih7/image/upload/v1709827637/socialmedia/y27joltjfmby93eppiyo.png" />
              {userData?.address.main} {userData?.address.extra}
            </p>
            <div className="pt-12 pb-8">
              <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Editar perfil
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 ">
          <img
            alt=""
            src={userData?.fotoUrl}
            className="rounded-none lg:rounded-lg lg:h-72 lg:w-72 shadow-2xl hidden lg:block object-cover"
          />
        </div>
        <div onClick={() => navigate("/landing")} className={`btn btn-info absolute top-0 right-0 h-12 w-18 p-4`}>
          <button>Volver al comercio</button>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">Editar perfil</h3>
          <div className="modal-action justify-center">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Foto de perfil</span>
                  </label>
                  <input type="file" placeholder="Seleccine una imagen" className="file-input file-input-bordered w-full max-w-xs mb-2" onChange={handleFileChange} />
                  <div className="flex justify-center w-full">
                    {isImageLoading ? (
                      <span className="loading loading-spinner text-primary"></span>
                    ) : (
                      <img className=" h-48 w-48" src={formValue.fotoUrl} alt=""></img>
                    )}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre</span>
                  </label>
                  <input type="text" placeholder="nombre" name="firstName" onChange={handleInputChange} value={formValue.firstName} className="input input-bordered text-base" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apellido</span>
                  </label>
                  <input type="text" placeholder="apellido" name="lastName" onChange={handleInputChange} value={formValue.lastName} className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Direccion de envios</span>
                  </label>
                  <input type="text" placeholder="apellido" name="main" onChange={handleInputChange} value={formValue.main} className="input input-bordered" />
                  <label className="label">
                    <span className="label-text">Extras</span>
                  </label>
                  <input type="text" placeholder="apellido" name="extra" onChange={handleInputChange} value={formValue.extra} className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-warning">Editar</button>
                </div>
                <form className="mb-3" method="dialog">
                  <button className="btn btn-primary w-full">Cancelar</button>
                </form>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Perfil;
