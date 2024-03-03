import { useDispatch } from "react-redux";
import useForm from "../../Hooks/useForm";
import { actionAddUserAsyn } from "../../Redux/Actions/actionsUser";


const NewComers = () => {

  const dispatch = useDispatch()
  const [formValue, handleInputChange, reset] = useForm({
    firstName: "",
    lastName: "",
    address: "",
    indications: "",
  });


  const onSubmit = async (e) => {
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
      await dispatch(actionAddUserAsyn(newObj))
    } catch (error) {
      console.log(error)
    }
    reset()
  }

  return (
    <div className="hero min-h-screen bg-base-200">
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