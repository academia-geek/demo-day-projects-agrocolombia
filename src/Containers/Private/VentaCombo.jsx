import React, { useEffect, useState } from 'react'
import useForm from '../../Hooks/useForm';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser';
import { actionListproductAsyn, actionSearchProductIDAsyn } from '../../Redux/Actions/actionsProduct';
import { actionAddCombosAsyn } from '../../Redux/Actions/actionsCombo';
import { FileUpload } from '../../Helpers/FileUpload';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { useNavigate } from 'react-router-dom';

const VentaCombo = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [urlsFotos, setUrlFotos] = useState([])
    const [datosU, setDatosU] = useState([])
    const [productosUser, setProductosUser] = useState()
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const dispatch = useDispatch()
    const [isImageLoading, setIsImageLoading] = useState(false);
    const { products } = useSelector((store) => store.productStore);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actionListproductAsyn())
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
        stock: 0,
        categoria: []
    });

    const handleSubmit = (e) => {
        const uidR = crypto.randomUUID()
        let obj = {
            id: uidR,
            name: formValue.name.toLowerCase(),
            productos: formValue.productos,
            precio: formValue.precio,
            desc: formValue.desc,
            descuento: formValue.descuento,
            media: formValue.media,
            stock: formValue.stock,
            dueño: datosU.uid,
            categoria: formValue.categoria
        };
        dispatch(actionAddCombosAsyn(obj));
        let aCombos = datosU.combos
        aCombos.push(uidR)
        const objUser = {
            ...datosU,
            combos: aCombos
        }
        dispatch(actionEditUserAsyn(objUser))
        setTimeout(() => {
            navigate("/mis-ventas")
        }, 2000);
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        let url = ""
        const media = formValue.media
        setIsImageLoading(true);
        FileUpload(file)
            .then((resp) => {
                url = resp
                media.push(url)
                formValue.media = media;
                setIsImageLoading(false);
            })
            .catch((err) => console.warn(err));
    };


    function handleCatSelect(producto) {
        const newSelectedProducts = [...selectedCats];
        const productIndex = newSelectedProducts.findIndex((item) => item === producto);
        if (productIndex !== -1) {
            newSelectedProducts.splice(productIndex, 1);
        } else {
            newSelectedProducts.push(producto);
        }
        formValue.categoria = newSelectedProducts;
        setSelectedCats(newSelectedProducts);
    }

    const categoriesSet = new Set();
    products?.forEach((p) => {
        p.categoria.forEach((c) => {
            categoriesSet.add(c);
        });
    });
    const categoriesArray = Array.from(categoriesSet);

    return (
        <div className='flex flex-col justify-between items-center gap-10 min-h-screen'>
            <NavbarP/>
            <div>
                <ul className="steps py-10">
                    <li className={`step ${activeStep >= 0 ? 'step-primary' : ''}`}>Nombra tu combo</li>
                    <li className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}>Selecciona los productos</li>
                    <li className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}>Precio y descuento</li>
                    <li className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}>Descripcion y stock</li>
                    <li className={`step ${activeStep >= 4 ? 'step-primary' : ''}`}>Extras</li>
                </ul>
                <div className={`flex flex-col gap-10 justify-center items-center ${activeStep === 0 ? '' : 'hidden'}`}>
                    <p className='text-2xl'>Colocale un nombre a tu producto</p>
                    <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Caja de aguacates haz" className="input input-bordered w-full max-w-xs" />
                    <button className='btn btn-primary' onClick={() => { setActiveStep(activeStep + 1) }}>Continuar</button>
                </div>
                <div className={`flex flex-col gap-10 justify-center items-center ${activeStep === 1 ? '' : 'hidden'}`}>
                    <p className='text-2xl'>Selecciona que productos quieres agregar a tu combo</p>
                    {
                        productosUser?.map((p, index) => (
                            <div className='grid grid-cols-2 gap-2 justify-center items-center' onClick={() => { handleProductSelect(p) }}>
                                <p>{p.name}</p>
                                <img className='size-14' src={p.media[0]} alt="" />
                                <p>${p.price}</p>
                                <p>{p.desc}</p>
                            </div>
                        ))
                    }
                    <div>
                        <h2 className='font-semibold'>Seleccionados: </h2>
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
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                        <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
                    </div>
                </div>
                <div className={`flex flex-col gap-10 justify-center items-center ${activeStep === 2 ? '' : 'hidden'}`}>
                    <div>
                        <p className='gap-3 pb-3 text-center font-semibold'>Precio del combo:</p>
                        <input name="precio" value={formValue.precio} onChange={handleInputChange} type='number' placeholder='2000' className='input input-bordered w-full max-w-xs'></input>
                    </div>
                    <div>
                        <p className='gap-3 pb-3 text-center font-semibold'>Porcentaje de descuento del combo:</p>
                        <input name="descuento" value={formValue.descuento} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                    </div>
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                        <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
                    </div>
                </div>
                <div className={`${activeStep === 3 ? '' : 'hidden'}`}>
                    <div className="grid grid-cols-2 gap-10 justify-center items-center text-center">
                        <p className='text-2xl'>Añadele una descripcion:</p>
                        <p className='text-2xl'>Cantidad:</p>
                        <textarea name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Caja de aguacates para consumo en una semana" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                        <input name="stock" value={formValue.stock} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                        </div>
                        <div className='flex flex-row gap-3 pt-7 justify-center items-center'>
                            <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                            <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
                    </div>
                </div>
                <div className={`flex flex-col gap-4 text-center ${activeStep === 4 ? '' : 'hidden'}`}>
                    <div>
                        <p className='text-2xl'>Añadele las categorias a tu producto</p>
                        {
                            categoriesArray?.map((p, index) => (
                                <div className='join join-vertical lg:join-horizontal py-3' onClick={() => { handleCatSelect(p) }}>
                                    <p className='join-item cursor-pointer p-2'>{p}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <h2 className='font-semibold'>Seleccionados:</h2>
                        {selectedCats.map((p) => (
                            <div className='join join-vertical lg:join-horizontal py-3'>
                                <p className='join-item p-2'>{p}</p>
                            </div>
                        ))}
                    </div>
                    <p className='text-2xl'>Coloca unas fotos extras a tu combo</p>
                    <input onChange={handleFileChange} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    {isImageLoading ? (
                        <span className="loading loading-spinner text-primary"></span>
                    ) : (
                            <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true} thumbWidth={100}>
                                {urlsFotos?.map((i, index) => (
                                    <div key={index}>
                                        <img style={{ width: 400, maxHeight: 400, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                                    </div>
                                ))}
                            </Carousel>
                    )}
                    <div className='flex flex-row gap-3 justify-center items-center'>
                        <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                        <button className='btn btn-primary w-48' onClick={() => handleSubmit()}>Vender</button>
                    </div>
                </div>
            </div>
            <FooterP/>
        </div>
    )
}

export default VentaCombo