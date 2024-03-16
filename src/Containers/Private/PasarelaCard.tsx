import React, { useEffect, useState } from 'react'
import ReactCreditCards, { Focused } from 'react-credit-cards-2';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser';
import { useNavigate } from 'react-router-dom';

interface State {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focus: Focused | undefined;
}

const initialState: State = {
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: undefined,
};

const PasarelaCard: React.FC = () => {
    const { userData } = useSelector((state: any) => state.userStore);
    const dispatch:any = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actionListUserAsyn());
    }, []);

    const [state, setState] = useState(initialState);

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, focus: evt.target.name as Focused }));
    };

    const handleLimpiarCarrito = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const objLimpiar = {
            ...userData,
            cart: [],
        };
        dispatch(actionEditUserAsyn(objLimpiar));
        (document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal();
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Ingresa los datos de tu tarjeta</h1>
                    <p className="py-6">Tus datos estan protegidos no te preocupes</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10">
                    <div>
                        <ReactCreditCards
                            number={state.number}
                            expiry={state.expiry}
                            cvc={state.cvc}
                            name={state.name}
                            focused={state.focus}
                        />
                        <form onSubmit={handleLimpiarCarrito}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Numero de la tarjeta</span>
                                </label>
                                <input value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} name='number' type="number" className="input input-bordered" autoComplete="true" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nombre</span>
                                </label>
                                <input value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} name='name' type="text" className="input input-bordered" autoComplete="true" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Fecha expiracion</span>
                                </label>
                                <input value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} name='expiry' type="text" className="input input-bordered" autoComplete="true" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">CVC</span>
                                </label>
                                <input value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} name='cvc' type="number" className="input input-bordered" autoComplete="true" required />
                            </div>
                            <div className='form-control mt-5'>
                                <button type='submit' className='btn btn-primary'>Pagar</button>
                            </div>
                        </form>
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
    );
};

export default PasarelaCard;