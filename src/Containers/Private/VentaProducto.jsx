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
import FooterP from "../../Components/FooterP";
import NavbarP from "../../Components/NavbarP";
import { useNavigate } from "react-router-dom";

const VentaProducto = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [datosU, setDatosU] = useState([]);
  const dispatch = useDispatch();
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { products } = useSelector((store) => store.productStore);
  const navigate = useNavigate()

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
      name: formValue.name.toLowerCase(),
      price: formValue.precio,
      desc: formValue.desc,
      descuento: formValue.descuento,
      media: formValue.media,
      stock: formValue.stock,
      dueño: datosU.uid,
      categoria: formValue.categoria || [],
    };
    dispatch(actionAddproductAsyn(obj));
    let aProductos = datosU.products;
    aProductos.push(uidR);
    const objUser = {
      ...datosU,
      products: aProductos,
    };
    dispatch(actionEditUserAsyn(objUser));
    setTimeout(() => {
      navigate("/mis-ventas")
    }, 2000);
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
    <div className='flex flex-col justify-between items-center gap-10 min-h-screen'>
      <NavbarP/>
      <div>
        <ul className="steps py-10">
          <li className={`step ${activeStep >= 0 ? 'step-primary' : ''}`}>Nombra tu producto</li>
          <li className={`step ${activeStep >= 1 ? 'step-primary' : ''}`}>Precio y descuento</li>
          <li className={`step ${activeStep >= 2 ? 'step-primary' : ''}`}>Descripcion y stock</li>
          <li className={`step ${activeStep >= 3 ? 'step-primary' : ''}`}>Extras</li>
        </ul>
        <div className={`flex flex-col gap-10 justify-center items-center ${activeStep === 0 ? '' : 'hidden'}`}>
          <p className='text-2xl'>Colocale un nombre a tu producto</p>
          <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Caja de aguacates haz" className="input input-bordered w-full max-w-xs" />
          <button className='btn btn-primary' onClick={() => { setActiveStep(activeStep + 1) }}>Continuar</button>
        </div>
        <div className={`flex flex-col gap-10 justify-center items-center ${activeStep === 1 ? '' : 'hidden'}`}>
          <div>
            <p className='gap-3 pb-3 text-center font-semibold'>Precio del producto:</p>
            <input name="precio" value={formValue.precio} onChange={handleInputChange} type='number' placeholder='2000' className='input input-bordered w-full max-w-xs'></input>
          </div>
          <div>
            <p className='gap-3 pb-3 text-center font-semibold'>Porcentaje de descuento del producto:</p>
            <input name="descuento" value={formValue.descuento} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
          </div>
          <div className='flex flex-row gap-3 justify-center items-center'>
              <button className='btn btn-primary' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
              <button className='btn btn-primary' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
          </div>
        </div>
        <div className={`${activeStep === 2 ? '' : 'hidden'}`}>
          <div className="grid grid-cols-2 gap-10 justify-center items-center text-center">
            <p className='text-2xl'>Añadele una descripcion:</p>
            <p className='text-2xl'>Cantidad:</p>
            <textarea name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Buldo de chontaduro" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
            <input name="stock" value={formValue.stock} onChange={handleInputChange} type='number' placeholder='10' className='input input-bordered w-full max-w-xs'></input>
          </div>
          <div className='flex flex-row gap-3 pt-7 justify-center items-center'>
              <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
              <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep + 1)}>Continuar</button>
          </div>
        </div>
        <div className={`flex flex-col gap-4 text-center ${activeStep === 3 ? '' : 'hidden'}`}>
          <p className='text-2xl'>Añadele las categorias a tu producto</p>
          <div className="flex gap-5 h-full justify-center">
            {
              categoriesArray?.map((p, index) => (
                <button onClick={() => { handleProductSelect(p) }} className=" btn btn-primary">{p}</button>
              ))
            }
          </div>
          <p className="text-xl">Categorias seleccionadas</p>
          <div className="flex gap-5 h-full justify-center">
            {selectedProducts.map((p) => (
              <button onClick={() => { handleProductSelect(p) }} className='btn btn-primary'>{p}</button>
            ))}
          </div>
          <p className='text-2xl'>Coloca unas fotos extras a tu combo</p>
          <div className="flex flex-col gap-5 h-full justify-center">
            <div className="flex gap-5 h-full justify-center">
              <input onChange={handleFileChange} type="file" className="file-input file-input-bordered file-input-primary w-fit" />
            </div>
            {isImageLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
                <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true} thumbWidth={100}>
                  {formValue?.media?.map((i, index) => (
                    <div key={index}>
                      <img style={{ width: 400, maxHeight: 400, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                    </div>
                  ))}
                </Carousel>
            )}
          </div>

          <div className='flex flex-row gap-3 justify-center items-center'>
              <button className='btn btn-primary w-48' onClick={() => setActiveStep(activeStep - 1)}>Atras</button>
              <button className='btn btn-primary w-48' onClick={() => handleSubmit()}>Vender</button>
          </div>
        </div>
      </div>
      <FooterP/>
    </div>
  );
};

export default VentaProducto;
