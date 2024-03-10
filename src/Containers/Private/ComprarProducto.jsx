import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { actionListUserUidAsyn } from '../../Redux/Actions/actionsUser';
import { Carousel } from 'react-responsive-carousel';
import { actionStartChatAsyn } from '../../Redux/Actions/actionsChat';
import { getAuth } from 'firebase/auth';

const ComprarProducto = () => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const { resultSearch } = useSelector(state => state.resultStore)
    const [compra, setCompra] = useState();
    const [relacionados, setRelacionados] = useState()
    const [bandera, setBander] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actionListproductAsyn())
        if (products !== 0) {
            products?.map((p) => {
                if (p.id === id) {
                    setCompra(p);
                    dispatch(actionListUserUidAsyn(p.dueño))
                    setBander(!bandera)
                }
            })
        }
        console.log("no")

    }, [id]);

    useEffect(()=>{
        let array = []
        if (products !== 0 && resultSearch) {
            products.map((x) => {
                resultSearch?.products.map((y) => {
                    if (y === x.id) {
                        array.push(x)
                    }
                })
            })
        }
        setRelacionados(array)
        console.log("no")
    }, [bandera, resultSearch])

    const [count, setCount] = useState(1);

    const handleIncrease = () => {
        setCount(count + 1);
    };

    const handleDecrease = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleChat = (info) => {
        dispatch(actionStartChatAsyn(info))
        navigate("/chats")
    }

    return (
        <div>
            <NavbarP />
            <div className='container mx-auto flex'>
                <div className='w-3/12 min-h-screen bg-accent fondo verde p-4'>
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
                            <img onClick={() => handleChat(resultSearch.uid)} className='size-12 cursor-pointer' src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709846420/Guajolota/1380370_nqvo2f.png" alt="" />
                        </div>
                        <div className='mt-4 flex justify-center flex-col'>
                            <p className='text-xl font-medium'>Productos realcionados</p>
                            <div className='columns-2'>
                                {relacionados?.slice(0, 4).map((i, index) => (
                                    <div key={`itemR${index}`}>
                                        <img onClick={() => navigate(`/comprar-producto/${i?.id}`)} className='size-20 cursor-pointer' src={i.media[0]} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 w-9/12 p-10'>
                    <div>
                        <Carousel style={{ width: 300 }} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                            {compra?.media?.map((i, index) => (
                                <div key={index}>
                                    <img style={{ width: 300, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="flex flex-col gap-20">
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
            </div>
            <FooterP />
        </div>
    )

}

export default ComprarProducto