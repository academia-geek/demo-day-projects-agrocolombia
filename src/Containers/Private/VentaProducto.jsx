import React, { useEffect, useState } from "react";
import useForm from "../../Hooks/useForm";
import { Carousel } from "react-responsive-carousel";
import { useDispatch } from "react-redux";
import {
  actionEditUserAsyn,
  actionListUserAsyn,
} from "../../Redux/Actions/actionsUser";
import { actionAddproductAsyn } from "../../Redux/Actions/actionsProduct";
import { FileUpload } from "../../Helpers/FileUpload";

const VentaProducto = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [datosU, setDatosU] = useState([]);
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false);

  useEffect(() => {
    const func = async () => {
      const datosUser = await dispatch(actionListUserAsyn());
      setDatosU(datosUser);
    };
    func();
  }, []);

  const [formValue, handleInputChange, reset] = useForm({
    name: "",
    precio: 0,
    desc: "",
    descuento: 0,
    media: [],
    stock: 0,
  });

  const handleSubmit = (e) => {
    const uidR = crypto.randomUUID();
    let obj = {
      id: uidR,
      name: formValue.name,
      price: formValue.precio,
      desc: formValue.desc,
      descuento: formValue.descuento,
      media: formValue.media,
      stock: formValue.stock,
    };
    dispatch(actionAddproductAsyn(obj));
    let aProductos = datosU.products;
    aProductos.push(uidR);
    const objUser = {
      ...datosU,
      products: aProductos,
    };
    dispatch(actionEditUserAsyn(objUser));
    reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let url = "";
    const media = formValue.media;
    setIsImageLoading(true);
    FileUpload(file)
      .then((resp) => {
        url = resp;
        media.push(url);
        formValue.media = media;
        setIsImageLoading(false);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div>
            <p>Vende tus productos</p>
            <ul className="steps">
                <li className={`step ${activeStep >= 0 ? 'step-primary' : ''}`}>Nombra tu producto</li>
                <li className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}>Precio y descuento</li>
                <li className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}>Descripcion y stock</li>
                <li className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}>Extras</li>
            </ul>
            <div className={`${activeStep === 0 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Colocale un nombre a tu producto</p>
                <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Caja de aguacates haz" className="input input-bordered w-full max-w-xs" />
                <button className='btn btn-primary' onClick={() => { setActiveStep(activeStep + 1) }}>Continuar</button>
            </div>
            <div className={`${activeStep === 1 ? '' : 'hidden'}`}>
                <div>
                    <p>Precio del producto</p>
                    <input name="precio" value={formValue.precio} onChange={handleInputChange} type='number' placeholder='2000' className='input input-bordered w-full max-w-xs'></input>
                </div>
                <div>
                    <p>Descuento del producto en %</p>
                    <input name="descuento" value={formValue.descuento} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                </div>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
            </div>
            <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Añadele una descripcion</p>
                <textarea name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Buldo de chontaduro" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                <p className='text-2xl'>Cantidad</p>
                <input name="stock" value={formValue.stock} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
            </div>
            <div className={`${activeStep === 3 ? '' : 'hidden'}`}>
                <p className='text-2xl'>Coloca unas fotos extras a tu combo</p>
                <input onChange={handleFileChange} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true} thumbWidth={100}>
                    {formValue?.media?.map((i, index) => (
                        <div key={index}>
                            <img style={{ width: 400, maxHeight: 400, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                        </div>
                    ))}
                </Carousel>
                <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
                <button onClick={() => handleSubmit()} className='btn btn-primary'>Vender</button>
            </div>
        </div>
  );
};

export default VentaProducto;
