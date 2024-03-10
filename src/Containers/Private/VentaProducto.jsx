import React, { useEffect, useState } from "react";
import useForm from "../../Hooks/useForm";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import {
  actionEditUserAsyn,
  actionListUserAsyn,
} from "../../Redux/Actions/actionsUser";
import { actionAddproductAsyn, actionListproductAsyn } from "../../Redux/Actions/actionsProduct";
import { FileUpload } from "../../Helpers/FileUpload";

const VentaProducto = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [datosU, setDatosU] = useState([]);
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { products } = useSelector((store) => store.productStore);

  useEffect(() => {
    dispatch(actionListproductAsyn())
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
    categorias: []
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
      dueño: datosU.uid,
      categoria: formValue.categoria,
    };
    dispatch(actionAddproductAsyn(obj));
    let aProductos = datosU.products;
    aProductos.push(uidR);
    const objUser = {
      ...datosU,
      products: aProductos,
    };
    dispatch(actionEditUserAsyn(objUser));
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

  function handleProductSelect(producto) {
    const newSelectedProducts = [...selectedProducts];
    const productIndex = newSelectedProducts.findIndex((item) => item === producto);
    if (productIndex !== -1) {
      newSelectedProducts.splice(productIndex, 1);
    } else {
      newSelectedProducts.push(producto);
    }
    formValue.categoria = newSelectedProducts;
    setSelectedProducts(newSelectedProducts);
  }

  const categoriesSet = new Set();
  products?.forEach((p) => {
    p.categoria.forEach((c) => {
      categoriesSet.add(c);
    });
  });
  const categoriesArray = Array.from(categoriesSet);

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
        <p className='text-2xl'>Añadele las categorias a tu producto</p>
        {
          categoriesArray?.map((p, index) => (
            <div onClick={() => { handleProductSelect(p) }}>
              <p>{p}</p>
            </div>
          ))
        }
        <div>
          Seleccionados:
          {selectedProducts.map((p) => (
            <div>
              <p>{p}</p>
            </div>
          ))}
        </div>
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
