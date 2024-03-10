import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';

const ComprarProducto = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const [compra, setCompra] = useState();
    
    useEffect(() => {
        dispatch(actionListproductAsyn())
        if (products !== 0) {
            products?.map((p) => {
                if (p.id === id) {
                    setCompra(p);
                }
            })
        }
    }, []);

    const [count, setCount] = useState(1);

    const handleIncrease = () => {
        setCount(count + 1);
    };

    const handleDecrease = () => {
        if (count > 1) {
        setCount(count - 1);
        }
    };

    return (
      <div>
        <NavbarP/>
          <div className='w-3/12 bg-accent fondo verde'>
  
          </div>
          <div className='grid grid-cols-2 gap-4 w-9/12'>
            <div>
                <figure className='w-fit h-fit'>
                    <img
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    src={compra?.media[0]}
                    alt={compra?.name.charAt(0).toUpperCase() + compra?.name.slice(1)}
                    />
                </figure>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                {compra?.name.charAt(0).toUpperCase() + compra?.name.slice(1)}
                </h2>
                <p>{compra?.desc}</p>
                <div className='flex text-center items-center'>
                    <p>Cantidad: </p>
                    <div className="join join-vertical lg:join-horizontal">
                        <button className="btn join-item" onClick={handleDecrease}>-</button>
                        <div className="flex text-center items-center w-10 join-item">
                            <p>{count}</p>
                        </div>
                        <button className="btn join-item" onClick={handleIncrease}>+</button>
                    </div>
                </div>
                <div className='flex rounded-lg outline items-center flex-col gap-2 p-4 ml-4 w-fit'>
                    <p>Total productos: {count * compra?.price} </p>
                    <button className='btn btn-accent'>Comprar</button>
                </div>
            </div>
          </div>
        <FooterP />
      </div>
    )

}

export default ComprarProducto