import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { actionRegisterAsync } from "../../Redux/Actions/actionsRegister";



const Register = () => {

  const dispatch= useDispatch();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Ingrese un correo valido").required("Este campo es requerido"),
    pass: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
      .matches(/[a-z]/, "La contraseña debe tener al menos una minúscula")
      .matches(/[0-9]/, "La contraseña debe tener al menos un número")
      .oneOf([Yup.ref("pass2"), "Las contraseñas No coinciden"])
      .required("Este campo es requerido"),
    pass2: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula")
      .matches(/[a-z]/, "La contraseña debe tener al menos una minúscula")
      .matches(/[0-9]/, "La contraseña debe tener al menos un número")
      .oneOf([Yup.ref("pass"), "Las contraseñas No coinciden"])
      .required("Este campo es requerido"),
  });

  return (
    <Formik initialValues={{
      email: "",
      pass: "",
      pass2: "",
    }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(actionRegisterAsync(values.email, values.pass));

      }}>
      {({ errors, touched }) => (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Registro</h1>
              <p className="py-6">No compartas tus datos personales con desconocidos</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <Form className="card-body">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Correo</span>
                  </label>
                  <Field name='email' className="input input-bordered" required />
                  {errors.email && touched.email ? (
                    <label className="label">
                      <span className="label-text-alt text-red-500 animate-bounce">{errors.email}</span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contraseña</span>
                  </label>
                  <Field name='pass' type="password" className="input input-bordered" required />
                  {errors.pass && touched.pass ? (
                    <label className="label">
                      <span className="label-text-alt text-red-500 animate-bounce">{errors.pass}</span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Comfirma tu cotraseña</span>
                  </label>
                  <Field name='pass2' type="password" className="input input-bordered" required />
                  {errors.pass2 && touched.pass2 ? (
                    <label className="label">
                      <span className="label-text-alt text-red-500 animate-bounce">{errors.pass2}</span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control mt-6">
                  <button type='submit' className="btn btn-primary">Registro</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  )
}

export default Register