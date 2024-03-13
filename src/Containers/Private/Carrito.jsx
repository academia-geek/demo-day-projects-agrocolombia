import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import { actionListCombosAsyn } from '../../Redux/Actions/actionsCombo';
import { actionAddCartItemAsyn, actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { Carousel } from 'react-responsive-carousel';

const Carrito = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((store) => store.productStore);
    const { combos } = useSelector((store) => store.combosStore);
    const { userData } = useSelector((state) => state.userStore);
    const [totalCost, setTotalCost] = useState(0);
    const [actual, setActual] = useState()
    const [cantActual, setCantActual] = useState()
    const [cantModificada, setCantModificada] = useState()
    const [bandera, setBandera] = useState(false)

    useEffect(() => {
        dispatch(actionListproductAsyn());
        dispatch(actionListCombosAsyn());
        dispatch(actionListUserAsyn());

        let totalCost = 0;
        userData.cart?.forEach((product) => {
            const { idProduct, cantidad } = product;
            const productItem = products.find((p) => p.id === idProduct);
            if (productItem) {
                const discountedPrice =
                    productItem.price * (1 - (productItem.descuento || 0) / 100);
                totalCost += discountedPrice * cantidad;
            }
        });

        userData.cart?.forEach((combo) => {
            const { idProduct, cantidad } = combo;
            const comboItem = combos.find((p) => p.id === idProduct);
            if (comboItem) {
                const discountedPrice =
                    comboItem.precio * (1 - (comboItem.descuento || 0) / 100);
                totalCost += discountedPrice * cantidad;
            }
        });
        setTotalCost(totalCost);
    }, [bandera]);

    const handleIncrease = () => {
        setCantModificada(cantModificada + 1);
    };

    const handleDecrease = () => {
        if (cantModificada > 1) {
            setCantModificada(cantModificada - 1);
        }
    };

    const handleLimpiarCarrito = () => {
        const objLimpiar = {
            ...userData,
            cart: []
        }
        dispatch(actionEditUserAsyn(objLimpiar));
        setBandera(!bandera)
    }

    const handleSubmitEdit = () => {
        const objEdit = {
            idUser: userData.uid,
            idProduct: actual.id,
            amount: cantModificada - cantActual
        }
        dispatch(actionAddCartItemAsyn(objEdit))
        setBandera(!bandera)
    }

    const handleDelteEdit = () => {
        const objEdit = {
            idUser: userData.uid,
            idProduct: actual.id,
            amount: -cantActual
        }
        dispatch(actionAddCartItemAsyn(objEdit))
        setBandera(!bandera)
        document.getElementById('my_modal_4').close()
    }

    return (
        <div className="min-h-screen">
            <NavbarP />
            <div className="min-h-full flex lg:flex-row flex-col justify-between">
                <div className="lg:w-9/12 p-10">
                    {userData?.cart?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="table w-full table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Total</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData?.cart?.map((product) => {
                                        const { idProduct, cantidad } = product;
                                        const productItem = products.find((p) => p.id === idProduct);
                                        if (productItem) {
                                            return (
                                                <tr key={productItem.id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={productItem.media[0]} alt={productItem.name} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{productItem.name}</div>
                                                                <div className="text-sm opacity-50">{productItem.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{cantidad}</td>
                                                    <td>
                                                        {productItem.price * (1 - (productItem.descuento || 0) / 100)}
                                                    </td>
                                                    <td>
                                                        {cantidad * (productItem.price * (1 - (productItem.descuento || 0) / 100))}
                                                    </td>
                                                    <td className='flex gap-5 flex-col lg:flex-row'>
                                                        <button onClick={() => { navigate(`/comprar-producto/${productItem?.id}`) }} className="btn btn-primary btn-xs">Ver</button>
                                                        <button className="btn btn-error btn-xs" onClick={() => { document.getElementById('my_modal_4').showModal(); setActual(productItem); setCantActual(cantidad); setCantModificada(cantidad) }}>Eliminar</button>
                                                        <button className="btn btn-warning btn-xs" onClick={() => { document.getElementById('my_modal_3').showModal(); setActual(productItem); setCantActual(cantidad); setCantModificada(cantidad) }}>Editar</button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                    {userData?.cart?.map((product) => {
                                        const { idProduct, cantidad } = product;
                                        const combosItem = combos.find((p) => p.id === idProduct);
                                        if (combosItem) {
                                            return (
                                                <tr key={combosItem.id}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={combosItem.media[0]} alt={combosItem.name} />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">{combosItem.name}</div>
                                                                <div className="text-sm opacity-50">{combosItem.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{cantidad}</td>
                                                    <td>
                                                        {combosItem.precio * (1 - (combosItem.descuento || 0) / 100)}
                                                    </td>
                                                    <td>
                                                        {cantidad * (combosItem.precio * (1 - (combosItem.descuento || 0) / 100))}
                                                    </td>
                                                    <td>
                                                        <button onClick={() => { navigate(`/comprar-producto/${combosItem?.id}`) }} className="btn btn-primary btn-xs">Ver</button>
                                                        <button className="btn btn-error btn-xs" onClick={() => { document.getElementById('my_modal_4').showModal(); setActual(combosItem); setCantActual(cantidad); setCantModificada(cantidad) }}>Eliminar</button>
                                                        <button className="btn btn-warning btn-xs" onClick={() => { document.getElementById('my_modal_3').showModal(); setActual(combosItem); setCantActual(cantidad); setCantModificada(cantidad) }}>Editar</button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Total</th>
                                        <th>{totalCost}</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                            </table>
                            <button onClick={() => handleLimpiarCarrito()} className='btn btn-warning'>Limpiar carrito</button>
                        </div>
                        ) : (
                        <div className="flex items-center justify-center h-5/6 flex-col gap-5">
                            <p className="text-xl font-bold">Aun no tienes productos en tu carrito</p>
                            <button onClick={() => navigate("/catalogo")} className='btn btn-primary'>Ir a catalogo</button>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-3/12 min-h-screen bg-accent px-4 py-4 lg:pb-4">
                    <div className="outline h-full rounded-lg p-2 pt-6 bg-white">
                        {userData?.cart?.length > 0 ? (
                            <div className='text-black'>
                                <p className='text-2xl font-bold'>Tu carrito de compras</p>
                                <div className='text-xl flex flex-col gap-5'>
                                    <p>Total de productos: {userData.cart.length}</p>
                                    <p>
                                        Total con envio: {totalCost <= 70000 ? (
                                            <div className='flex flex-col'>
                                                <span>{totalCost + 14000}</span>
                                                <span className="text-warning">Para obtener el envio gratis tienes que hacer compras de mas de 70000</span>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className='mr-2'>{totalCost}</span>
                                                <span className="text-primary font-bold">Envio Gratis</span>
                                            </div>
                                        )}
                                    </p>
                                    <p>Número de productos: {userData.cart.reduce((acc, product) => acc + product.cantidad, 0)}</p>
                                    <p>Dirección de entrega: {userData.address.main || 'No especificada'}</p>
                                    <p>Indicaciones: {userData.address.extra || 'No especificada'}</p>
                                    <p>Nombre de recibo: {`${userData.firstName} ${userData.lastName}` || 'No especificado'}</p>
                                    <p>Compra protegida con garantía de consumidor</p>
                                    <div className='w-full'>
                                        {totalCost < 70000 ? (
                                            <div>
                                                <button onClick={() => navigate(`/pasarela/${totalCost + 14000}`)} className='btn w-full btn-primary'>Pagar ${totalCost + 14000}</button>
                                            </div>
                                        ) : (
                                            <div>
                                                    <button onClick={() => navigate(`/pasarela/${totalCost}`)} className='btn w-full btn-primary'>Pagar ${totalCost}</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>) : (
                            <div>
                                
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-5">{actual?.name}</h3>
                    <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false}>
                        {actual?.media?.map((i, index) => (
                            <div key={index}>
                                <img style={{ width: 400, height: 300, objectFit: "contain" }} src={i} alt='' />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex flex-col text-center items-center gap-5'>
                        <p className='font-medium text-xl'>Cantidad</p>
                        <div className="join join-vertical lg:join-horizontal">
                            <button className="btn join-item" onClick={handleDecrease}>-</button>
                            <div className="flex text-center items-center w-10 join-item justify-center">
                                <p>{cantModificada}</p>
                            </div>
                            <button className="btn join-item" onClick={handleIncrease}>+</button>
                        </div>
                        <button onClick={() => handleSubmitEdit()} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Guardar</button>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-5">{actual?.name}</h3>
                    <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false}>
                        {actual?.media?.map((i, index) => (
                            <div key={index}>
                                <img style={{ width: 400, height: 300, objectFit: "contain" }} src={i} alt='' />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex flex-col text-center items-center gap-5'>
                        <p className='font-medium text-xl'>Estas seguro de eliminar este producto del carrito?</p>
                        <button onClick={() => document.getElementById('my_modal_4').close()} className="btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg">Cancelar</button>
                        <button onClick={() => handleDelteEdit()} className="btn btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg">Eliminar</button>
                    </div>
                </div>
            </dialog>
            <FooterP />
        </div>
    );
};

export default Carrito;