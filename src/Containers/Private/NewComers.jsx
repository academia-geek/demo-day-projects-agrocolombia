import { useDispatch } from "react-redux";
import useForm from "../../Hooks/useForm";
import { actionAddUserAsyn } from "../../Redux/Actions/actionsUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const NewComers = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  
  const [formValue, handleInputChange, reset] = useForm({
    firstName: "",
    lastName: "",
    address: "",
    indications: "",
  });


  const onSubmit = (e) => {
    e.preventDefault();
    const newObj = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      address: {
        main: formValue.address,
        extra: formValue.indications,
      }
    }
    reset()
    try {
      setLoading(true)
      dispatch(actionAddUserAsyn(newObj))
      setTimeout(() => {
        setLoading(false)
        navigate("/")
      }, 2000);
    } catch (error) {
      console.log(error)
    }
    reset()
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="loading loading-spinner text-primary size-12"></span>
          </div>
        </div>
      )}
      <div className="hero-content">
        <div className="text-center lg:text-center">
          <h1 className="text-4xl font-bold">Completa tu registro para continuar</h1>
          <p className="py-6">Completa tu registro para poder ingresar a nuestra tienda.</p>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={onSubmit} className="card-body">
            <div className="form-control">
              <label className="label">Nombres:</label>
              <input value={formValue.firstName} onChange={handleInputChange} name='firstName' className="textarea textarea-bordered" placeholder="Direccion de tu recidencia" required />
            </div>
            <div className="form-control">
              <label className="label">Apellidos:</label>
              <input value={formValue.lastName} onChange={handleInputChange} name='lastName' className="textarea textarea-bordered" placeholder="Direccion de tu recidencia" required />
            </div>
            <div className="form-control">
              <label className="label">Direccion:</label>
              <textarea value={formValue.address} onChange={handleInputChange} name='address' className="textarea textarea-bordered" placeholder="Direccion de tu recidencia" required />
            </div>
            <div className="form-control">
              <label className="label">Indicaciones:</label>
              <textarea value={formValue.indications} onChange={handleInputChange} name='indications' className="textarea textarea-bordered" placeholder="Cuarto piso apartamento 450" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Continuar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewComers