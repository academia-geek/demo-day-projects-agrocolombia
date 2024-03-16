import React, { useEffect, useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { actionDeleteProductAsyn, actionEditProductAsyn, actionListproductAsyn } from '../../Redux/Actions/actionsProduct'
import { useDispatch, useSelector } from 'react-redux'
import { actionDeleteCombosAsyn, actionEditCombosAsyn, actionListCombosAsyn } from '../../Redux/Actions/actionsCombo'
import useForm from '../../Hooks/useForm'
import { Carousel } from 'react-responsive-carousel'
import { FileUpload } from '../../Helpers/FileUpload'
import { actionEditUserAsyn, actionListUserAsyn } from '../../Redux/Actions/actionsUser'

const MisVentas = () => {

  const { userData } = useSelector(state => state.userStore)
  const { products } = useSelector((store) => store.productStore);
  const { combos } = useSelector((store) => store.combosStore);
  const [productosUser, setProductosUser] = useState()
  const [combosUser, setCombosUser] = useState()
  const [productoEdit, setProductoEdit] = useState()
  const [comboEdit, setComboEdit] = useState()
  const dispatch = useDispatch()
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [bandera, setBandera] = useState()

  useEffect(() => {
    dispatch(actionListproductAsyn())
    dispatch(actionListCombosAsyn())
    dispatch(actionListUserAsyn())
  }, [bandera])

  useEffect(() => {
    const func = async () => {
      const proA = []
      const proB = []
      userData?.products.map( (p, index) => {
        const pro = products.filter((product) => product.id === p);
        proA.push(...pro)
      })
      userData?.combos.map( (p, index) => {
        const pro = combos.filter((combos) => combos.id === p);
        proB.push(...pro)
      })
      setProductosUser(proA)
      setCombosUser(proB)
    }
    func()
  }, [bandera])

  const handleClickCombo = (c) => {
    setComboEdit(c)
    formValue.id = c.id
    formValue.name = c.name;
    formValue.productos = c.productos;
    formValue.pricio = c.precio;
    formValue.desc = c.desc;
    formValue.descuento = c.descuento;
    formValue.media = c.media;
    formValue.stock = c.stock;
    formValue.costoEnvio = c.costoEnvio || 0;
    formValue.ubicacion = c.ubicacion || "";
  }

  const handleClikProduct = (p) => {
    setProductoEdit(p)
    formValue.id = p.id;
    formValue.ubicacion = p.ubicacion;
    formValue.costoEnvio = p.costoEnvio;
    formValue.name = p.name;
    formValue.price = p.price;
    formValue.desc = p.desc;
    formValue.descuento = p.descuento;
    formValue.media = p.media;
    formValue.stock = p.stock;
    formValue.costoEnvio = p.costoEnvio || 0;
    formValue.ubicacion = p.ubicacion || "";
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

  const [formValue, handleInputChange] = useForm({});

  const handleSubmitCombo = () => {
    dispatch(actionEditCombosAsyn(formValue))
    setTimeout(() => {
      setBandera(!bandera);
      document.getElementById('my-drawer-5').click()
    }, 1000);
  }
  
  const handleSubmitProducto = () => {
    dispatch(actionEditProductAsyn(formValue))
    setTimeout(() => {
      setBandera(!bandera);
      document.getElementById('my-drawer-4').click()
    }, 1000);
  }

  const handleEliminarProducto = () => {
    const eliminar = productoEdit.id;
    const newObj = {
      ...userData,
      products: userData.products.filter((product) => product !== eliminar),
    };
    dispatch(actionEditUserAsyn(newObj));
    dispatch(actionDeleteProductAsyn(eliminar))
    setTimeout(() => {
      setBandera(!bandera);
    }, 1000);
  };
  
  const handleEliminarCombo = () => {
    const eliminar = comboEdit.id;
    const newObj = {
      ...userData,
      combos: userData.combos.filter((combo) => combo !== eliminar),
    };
    dispatch(actionEditUserAsyn(newObj));
    dispatch(actionDeleteCombosAsyn(eliminar))
    setTimeout(() => {
      setBandera(!bandera);
    }, 1000);
  };

  return (
    <div>
      <NavbarP/>
      <div className=' bg-accent min-h-screen p-10'>
        <p className='text-3xl font-bold mb-5'>Mis ventas</p>
        <div className='flex flex-col lg:flex-row justify-between'>
          <div>
            <p className='text-xl mb-5 font-bold'>Mis productos</p>
            <div className='flex flex-col gap-5'>
              {productosUser?.map((p,index)=> (
                <div className='' key={index} >
                  <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img className='size-40 object-contain' src={p.media[0]} alt="Movie" /></figure>
                    <div className="card-body">
                      <h2 className="card-title capitalize">{p.name}</h2>
                      <p>Stock restante: {p.stock}</p>
                      <p>Precio del producto: {p.price}</p>
                      <div className="card-actions justify-end">
                        <label onClick={() => handleClikProduct(p)} htmlFor="my-drawer-4" className="drawer-button btn btn-warning">Editar</label>
                        <button onClick={() => { setProductoEdit(p); document.getElementById('my_modal_5').showModal()}} className="btn btn-error">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className='text-xl mb-5 font-bold'>Mis Combos</p>
            <div className='flex flex-col gap-5'>
              {combosUser?.map((c, index) => (
                <div className='' key={index} >
                  <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img className='size-40 object-contain' src={c.media[0]} alt="Movie" /></figure>
                    <div className="card-body">
                      <h2 className="card-title capitalize">{c.name}</h2>
                      <p>Stock restante: {c.stock}</p>
                      <p>Precio del producto: {c.price}</p>
                      <div className="card-actions justify-end">
                        <label onClick={() => handleClickCombo(c)} htmlFor="my-drawer-4" className="drawer-button btn btn-warning">Editar</label>
                        <button onClick={() => { setComboEdit(c); document.getElementById('my_modal_6').showModal()}} className="btn btn-error">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-6 w-2/4 min-h-full bg-base-200 text-base-content">
              <div>
                <p>{productoEdit?.name}</p>
                <p>Nombre del producto:</p>
                <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Nombre" className="input input-bordered w-full max-w-xs" />
                <p>Precio del producto:</p>
                <input type="number" name="price" value={formValue.price} onChange={handleInputChange} placeholder="Precio" className="input input-bordered w-full max-w-xs" />
                <p>Descripcion del producto:</p>
                <input type="text" name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Descripcion" className="input input-bordered w-full max-w-xs" />
                <p>Descuento en % del producto:</p>
                <input type="number" name="descuento" value={formValue.descuento} onChange={handleInputChange} placeholder="Descuento" className="input input-bordered w-full max-w-xs" />
                <p>Stock del producto:</p>
                <input type="number" name="stock" value={formValue.stock} onChange={handleInputChange} placeholder="Stock" className="input input-bordered w-full max-w-xs" />
                <p>Edita tus fotos</p>
                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <Carousel style={{ width: 300 }} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                  {productoEdit?.media?.map((i, index) => (
                    <div key={index}>
                      <img style={{ width: 200, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                    </div>
                  ))}
                </Carousel>
                <button className='btn btn-warning' onClick={() => { handleSubmitProducto() }}>Confimar edicion</button>
              </div>
            </ul>
          </div>
        </div>

        <div className="drawer drawer-end">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-6 w-2/4 min-h-full bg-base-200 text-base-content">
              <div>
                <p>{comboEdit?.name}</p>
                <p>Nombre del producto:</p>
                <input type="text" name="name" value={formValue.name} onChange={handleInputChange} placeholder="Nombre" className="input input-bordered w-full max-w-xs" />
                <p>Precio del producto:</p>
                <input type="number" name="pricio" value={formValue.pricio} onChange={handleInputChange} placeholder="Precio" className="input input-bordered w-full max-w-xs" />
                <p>Descripcion del producto:</p>
                <input type="text" name="desc" value={formValue.desc} onChange={handleInputChange} placeholder="Descripcion" className="input input-bordered w-full max-w-xs" />
                <p>Descuento en % del producto:</p>
                <input type="number" name="descuento" value={formValue.descuento} onChange={handleInputChange} placeholder="Descuento" className="input input-bordered w-full max-w-xs" />
                <p>Stock del producto:</p>
                <input type="number" name="stock" value={formValue.stock} onChange={handleInputChange} placeholder="Stock" className="input input-bordered w-full max-w-xs" />
                <p>Edita tus fotos</p>
                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <Carousel style={{width: 300}} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                  {comboEdit?.media?.map((i, index) => (
                    <div key={index}>
                      <img style={{ width: 200, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                    </div>
                  ))}
                </Carousel>
                <button className='btn btn-warning' onClick={() => { handleSubmitCombo()}}>Confimar edicion</button>
                <button className='btn btn-secondary'>Cancelar edicion</button>
              </div>
            </ul>
          </div>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Estas seguro de eliminar el producto?</h3>
            <p className="py-4">Eliminaras el producto con el nombre {productoEdit?.nombre}</p>
            <button className='btn btn-warning' onClick={() => document.getElementById('my_modal_5').close()}>Cancelar</button>
            <button className='btn btn-error' onClick={() => handleEliminarProducto()}>Eliminar</button>
          </div>
        </dialog>

        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Estas seguro de eliminar este combo?</h3>
            <p className="py-4">Eliminaras el combo con el nombre {comboEdit?.nombre}</p>
            <button className='btn btn-warning' onClick={() => { document.getElementById('my_modal_6').close() }}>Cancelar</button>
            <button className='btn btn-error' onClick={() => { handleEliminarCombo() }}>Eliminar</button>
          </div>
        </dialog>

      </div>
      <FooterP/>
    </div>
  )
}

export default MisVentas