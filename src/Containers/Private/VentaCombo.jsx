import React, { useEffect, useState } from 'react'
import useForm from '../../Hooks/useForm';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from 'react-redux';
import { actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser';
import { actionSearchProductIDAsyn } from '../../Redux/Actions/actionsProduct';
import { actionAddCombosAsyn } from '../../Redux/Actions/actionsCombo';

const VentaCombo = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [urlsFotos, setUrlFotos] = useState([])
    const [datosU, setDatosU] = useState([])
    const [productosUser, setProductosUser] = useState()
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        const func = async () => {
            const datosUser = await dispatch(actionListUserAsyn())
            setDatosU(datosUser)
            const proA = []
            datosUser?.products.map(async (p, index) => {
                const pro = await dispatch(actionSearchProductIDAsyn(p))
                proA.push(pro)
            })
            setProductosUser(proA)
        }
        func()
    }, [])

    const [formValue, handleInputChange, reset] = useForm({
        name: "",
        productos: [],
        precio: 0,
        desc: "",
        descuento: 0,
        media: [],
        stock: 0
    });

    //TODO: FALTA AGREGAR EL CLOUDINARY ----------------------------------------------------------------------------------------------------------------------------------

    const handleSubmit = (e) => {
        const uidR = crypto.randomUUID()
        let obj = {
            id: uidR,
            name: formValue.name,
            productos: formValue.productos,
            precio: formValue.precio,
            desc: formValue.desc,
            descuento: formValue.descuento,
            media: formValue.media,
            stock: formValue.stock,
        };
        dispatch(actionAddCombosAsyn(obj));
        let aCombos = datosU.combos
        aCombos.push(uidR)
        const objUser = {
            ...datosU,
            combos: aCombos
        }
        dispatch(actionEditUserAsyn(objUser))
        reset();
    };

    function handleProductSelect(producto) {
        const newSelectedProducts = [...selectedProducts];
        const newSelectedUrlProducts = [...urlsFotos];

        const productIndex = newSelectedProducts.findIndex(
            (item) => item.id === producto.id
        );

        if (productIndex !== -1) {
            newSelectedProducts.splice(productIndex, 1);
            newSelectedUrlProducts.splice(productIndex, 1);
        } else {
            newSelectedProducts.push(producto);
            newSelectedUrlProducts.push(producto.media[0]);
        }

        formValue.productos = newSelectedProducts.map((product) => product.id); 
        formValue.media = newSelectedUrlProducts
        setSelectedProducts(newSelectedProducts);
        setUrlFotos(newSelectedUrlProducts);
    }


    return (
        <div>
            <p>Vende tus combos</p>
            <ul className="steps">
                <li className={`step ${activeStep >= 0 ? 'step-primary' : ''}`}>Nombra tu combo</li>
                <li className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}>Selecciona los productos</li>
                <li className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}>Precio y descuento</li>
                <li className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}>Descripcion y stock</li>
                <li className={`step ${activeStep >= 4 ? 'step-primary' : ''}`}>Extras</li>
            </ul>
            <div className={`${activeStep === 0 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Colocale un nombre a tu producto</p>
                <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Caja de aguacates haz" className="input input-bordered w-full max-w-xs" />
                <button className='btn btn-primary' onClick={() => { setActiveStep(activeStep + 1) }}>Continuar</button>
            </div>
            <div className={`${activeStep === 1 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Selecciona que productos quieres agregar a tu combo</p>
                {
                    productosUser?.map((p, index) => (
                        <div onClick={() => { handleProductSelect(p) }}>
                            <p>{p.name}</p>
                            <p>{p.desc}</p>
                            <p>{p.price}</p>
                            <img className='size-12' src={p.media[0]} alt="" />
                        </div>
                    ))
                }
                <div>
                    Seleccionados:
                    {selectedProducts.map((producto) => (
                        <div className="tarjeta-producto">
                            <img className="size-12" src={producto.media[0]} alt="" />
                            <div className="informacion-producto">
                                <p className="nombre-producto">{producto.name}</p>
                                <p className="descripcion-producto">{producto.desc}</p>
                                <p className="precio-producto">{producto.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
            </div>
            <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
                <div>
                    <p>Precio del combo</p>
                    <input name="precio" value={formValue.precio} onChange={handleInputChange} type='number' placeholder='2000' className='input input-bordered w-full max-w-xs'></input>
                </div>
                <div>
                    <p>Descuento del combo en %</p>
                    <input name="descuento" value={formValue.descuento} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                </div>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
            </div>
            <div className={`${activeStep === 3 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Añadele una descripcion</p>
                <textarea name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Caja de aguacates para consumo en una semana" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <p className='text-2xl'>Cantidad</p>
                <input name="stock" value={formValue.stock} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
            </div>
            <div className={`${activeStep === 4 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Coloca unas fotos extras a tu combo</p>
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true} thumbWidth={100}>
                    {urlsFotos?.map((i, index) => (
                        <div key={index}>
                            <img style={{ width: 400, maxHeight: 400, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                        </div>
                    ))}
                </Carousel>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button onClick={() => handleSubmit()} className='btn btn-primary'>Vender</button>
            </div>
        </div>
    )
}

export default VentaCombo