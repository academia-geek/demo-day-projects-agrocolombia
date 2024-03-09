import React, { useEffect, useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FooterP from '../../Components/FooterP'
import { actionListUserAsyn } from '../../Redux/Actions/actionsUser'
import { actionEditProductAsyn, actionListproductAsyn, actionSearchProductIDAsyn } from '../../Redux/Actions/actionsProduct'
import { useDispatch, useSelector } from 'react-redux'
import { actionEditCombosAsyn, actionListCombosAsyn, actionSearchComboIDAsyn } from '../../Redux/Actions/actionsCombo'
import useForm from '../../Hooks/useForm'
import { Carousel } from 'react-responsive-carousel'

const MisVentas = () => {

  const { userData } = useSelector(state => state.userStore)
  const { products } = useSelector((store) => store.productStore);
  const { combos } = useSelector((store) => store.combosStore);
  const [productosUser, setProductosUser] = useState()
  const [combosUser, setCombosUser] = useState()
  const [productoEdit, setProductoEdit] = useState()
  const [comboEdit, setComboEdit] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actionListproductAsyn())
    dispatch(actionListCombosAsyn())
  }, [])

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
      console.log(proA)
      console.log(proB)
      setProductosUser(proA)
      setCombosUser(proB)

    }
    func()
  }, [])

  
  const prueba = () => {
    console.log(combosUser)
    console.log(productosUser)
  }

  const handleClickCombo = (c) => {
    setComboEdit(c)
    formValue.name = c.name;
    formValue.productos = c.productos;
    formValue.pricio = c.precio;
    formValue.desc = c.desc;
    formValue.descuento = c.descuento;
    formValue.media = c.media;
    formValue.stock = c.stock;
  }

  const handleClikProduct = (p) => {
    console.log(p)
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
  }

  const [formValue, handleInputChange, reset] = useForm({});

  const handleSubmitCombo = () => {
    dispatch(actionEditCombosAsyn(formValue))
  }
  
  const handleSubmitProducto = () => {
    dispatch(actionEditProductAsyn(formValue))
  }
  

  return (
    <div>
      <NavbarP/>
      <div>
        <button onClick={() => prueba()}>PRUEBA</button>
        <p>Mis ventas</p>
        <div>
          <p>Mis productos</p>
          {productosUser?.map((p,index)=> (
            <div key={index} onClick={() => handleClikProduct(p)}>
              <img className='size-12' src={p.media[0]} alt=''></img>
              <p>{p.name}</p>
              <p>{p.stock}</p>
              <p>{p.price}</p>
              <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <p>Mis Combos</p>
          {combosUser?.map((c, index) => (
            <div key={index} onClick={() => handleClickCombo(c)}>
              <img className='size-12' src={c.media[0]} alt=''></img>
              <p>{c.name}</p>
              <p>{c.stock}</p>
              <p>{c.precio}</p>
              <label htmlFor="my-drawer-5" className="drawer-button btn btn-primary">Open drawer</label>
            </div>
          ))}
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
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <Carousel style={{ width: 300 }} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                  {productoEdit?.media?.map((i, index) => (
                    <div key={index}>
                      <img style={{ width: 200, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                    </div>
                  ))}
                </Carousel>
                <button className='btn btn-warning' onClick={() => { handleSubmitProducto() }}>Confimar edicion</button>
                <button className='btn btn-secondary'>Cancelar edicion</button>
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
                <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
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

      </div>
      <FooterP/>
    </div>
  )
}

export default MisVentas