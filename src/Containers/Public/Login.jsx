import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { actionGoogle, actionLoginAsyn } from "../../Redux/Actions/actionsLogin"
import useForm from "../../Hooks/useForm"
import { useState } from "react"

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState()
  const [formValue, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue)
    try {
      const auth = await dispatch(actionLoginAsyn(formValue.email, formValue.password))
      if (auth){
        setErrorMessage(auth)
      }
    } catch (error) {
      setErrorMessage(error)
    }
    reset()
  }

  const onGoogle = async () => {
    await dispatch(actionGoogle())
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Inicio de sesión</h1>
          <p className="py-6">Ahora tambien ya puedes iniciar sesión mediante Google</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={onSubmit} className="card-body">
            <div>
              <button onClick={( ) => navigate("/")} className="btn btn-primary">Volver al inicio</button>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo</span>
              </label>
              <input value={formValue.email} onChange={handleInputChange} name='email' type="email" placeholder="Correo" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input value={formValue.password} onChange={handleInputChange} name='password' type="password" placeholder="Contraseña" className="input input-bordered" autoComplete="true" required />
            </div>
            <label className="label">
              <span className="label-text-alt text-red-500 animate-bounce">{errorMessage}</span>
            </label>
            <label className="label">
              <Link to="/register" className="label-text-alt link link-hover text-primary">No tienes cuenta? Registrate aqui</Link>
            </label>
            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Inciar sesión</button>
            </div>
            <div className="divider"></div>
            <div className="form-control">
              <button className="btn btn-secundary" onClick={() => onGoogle()} >
                <img style={{ width: 20, height: 20 }} src='https://res.cloudinary.com/dlwr6vxib/image/upload/v1709403951/Guajolota/300221_qcqzgl.png' alt='googleIcon'></img>
                <p>Inicio de sesion con Google</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login