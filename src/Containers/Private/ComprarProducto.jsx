import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { actionListUserUidAsyn } from '../../Redux/Actions/actionsUser';

const ComprarProducto = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const { resultSearch } = useSelector(state => state.resultStore)
    const [compra, setCompra] = useState();

    useEffect(() => {
        dispatch(actionListproductAsyn())
        if (products !== 0) {
            products?.map((p) => {
                if (p.id === id) {
                    setCompra(p);
                    console.warn(p)
                    dispatch(actionListUserUidAsyn(p.dueño))
                }
            })
        }
        let array = []
        if (products !== 0) {
            resultSearch.products.map((p) => {
                products.map((x) => {
                    if (x.id === p) {
                        console.warn(x)
                    }
                })
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
            <NavbarP />
            <div className='container mx-auto flex'>
                <div className='w-3/12 bg-accent fondo verde p-4'>
                    <div className='outline h-full rounded-lg p-2 pt-6 bg-base'>
                        <div className="avatar w-full flex justify-center">
                            <div className="w-10/12 rounded-full">
                                <img src={resultSearch?.fotoUrl} alt='' />
                            </div>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <p className='text-xl font-medium'>{resultSearch?.firstName} {resultSearch?.lastName}</p>
                        </div>
                        <div className='flex justify-center mt-3'>
                            <img className='size-12 cursor-pointer' src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709846420/Guajolota/1380370_nqvo2f.png" alt="" />
                        </div>
                        <div className='mt-4 flex justify-center text-xl font-medium'>
                            <p>Productos realcionados</p>
                            <div>
                                {products?.map((p) => {
                                    resultSearch?.products.map((up) => {
                                        if (p._id === up){
                                            console.error(p)
                                        }
                                    })
                                })}
                            </div>
                        </div>
                    </div>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quo minima nisi dolorum laboriosam, repellat in adipisci molestias voluptatibus officiis, ab nulla soluta cupiditate hic optio, cum eveniet exercitationem magni?</p>
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
            </div>
            <FooterP />
        </div>
    )

}

export default ComprarProducto