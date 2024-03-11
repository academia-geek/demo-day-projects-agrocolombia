import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser';

const Pasarela = () => {

  const { total } = useParams();
  const navigate = useNavigate()
  const { userData } = useSelector((state:any) => state.userStore);
  const dispatch:any = useDispatch()

  useEffect(() => {
    dispatch(actionListUserAsyn());
  }, [])

  const handleLimpiarCarrito = () => {
    const objLimpiar = {
      ...userData,
      cart: []
    }
    dispatch(actionEditUserAsyn(objLimpiar));
    (document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal();
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Elije como pagar</h1>
          <p className="py-6">Elije tu metodo de pago favorito</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10 gap-5">
          <div onClick={() => handleLimpiarCarrito()} className='w-full border rounded-lg p-5 flex justify-center cursor-pointer'>
            <img style={{height: 50, width: 200, objectFit: "contain" }} src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1706314810/Guajolota/logo-Nequi_by_Bancolombia_jyq3jf.png" alt="" />
          </div>
          <div onClick={() => handleLimpiarCarrito()} className='w-full border rounded-lg p-5 flex justify-center cursor-pointer'>
            <img style={{ height: 50, width: 200, objectFit: "contain" }} src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1706314809/Guajolota/daviplata-logo_gpeent.webp" alt="" />
          </div>
          <div onClick={() => handleLimpiarCarrito()} className='w-full border rounded-lg p-5 flex justify-center cursor-pointer'>
            <img style={{ height: 50, width: 200, objectFit: "contain" }} src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1706314810/Guajolota/Nubank_logo_2021.svg_ngtogk.png" alt="" />
          </div>
          <div onClick={()=>navigate("/pasarelaCard")} className='w-full border rounded-lg p-5 flex justify-center cursor-pointer'>
            <img style={{ height: 50, width: 200, objectFit: "contain" }} src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1707236343/Guajolota/b6af6bc43a84065cb8bf7271619e55c5_pwitqf.jpg" alt="" />
          </div>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Compra realizada con exito!!!</h3>
          <div className='w-full flex justify-center'>
            <img className='size-2/3' src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1710113259/Guajolota/imagen_2024-03-10_182738451_r0pqgx.png" alt="Todo correcto" />
          </div>
          <div className='w-full flex justify-center mt-5'>
            <button onClick={() => navigate("/*")} className='btn btn-primary'>Volver al comercio</button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Pasarela