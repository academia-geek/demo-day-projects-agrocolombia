import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { actionAddCartItemAsyn, actionListUserUidAsyn } from '../../Redux/Actions/actionsUser';
import { Carousel } from 'react-responsive-carousel';
import { actionStartChatAsyn } from '../../Redux/Actions/actionsChat';
import { getAuth } from 'firebase/auth';

const ComprarProducto = () => {
    const userUID = getAuth()
    const { id } = useParams();
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const { resultSearch } = useSelector(state => state.resultStore)
    const [compra, setCompra] = useState();
    const [relacionados, setRelacionados] = useState()
    const [bandera, setBander] = useState(false)
    const navigate = useNavigate()
    const [alert, setAlert] = useState(false)

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

    const handleComprar = () => {
        setAlert(true)
        const objSend = {
            idUser: userUID.currentUser.uid,
            idProduct: compra.id,
            amount: count
        }
        dispatch(actionAddCartItemAsyn(objSend));
        setCount(0)
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    }

    return (
        <div>
            {
                alert ? (
                    <div className="toast toast-top toast-center z-auto">
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Your purchase has been confirmed!</span>
                        </div>
                    </div>
                ) : ("")
            }
            <NavbarP />
            <div className='min-h-full flex lg:flex-row flex-col justify-between'>
                <div className='w-full lg:w-3/12 min-h-screen bg-accent px-4 pb-4 lg:pb-4'>
                    <div className='outline h-full rounded-lg p-2 pt-6 bg-white'>
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
                            <p className='text-xl font-medium'>Productos relacionados</p>
                            <div className='columns-2 p-5'>
                                {relacionados?.slice(0, 4).map((i, index) => (
                                    <div key={`itemR${index}`}>
                                        <img onClick={() => navigate(`/comprar-producto/${i?.id}`)} className='size-20 cursor-pointer rounded-lg object-cover mb-5' src={i.media[0]} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4 p-10 w-full'>
                    <div className=''>
                        <Carousel style={{ width: 300 }} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                            {compra?.media?.map((i, index) => (
                                <div key={index}>
                                    <img style={{ width: 300, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className="flex flex-col gap-20 className='w-1/2">
                        <h2 className="card-title">
                            {compra?.name.charAt(0).toUpperCase() + compra?.name.slice(1)}
                        </h2>
                        <div>
                            {compra?.categoria?.map((cat) => (
                                <div onClick={() => navigate(`/catalogo/${cat}`)} className="badge badge-outline cursor-pointer">{cat}</div>
                            ))}
                        </div>
                        <p>{compra?.desc}</p>
                        <div className='flex text-center items-center'>
                            <p>Cantidad: </p>
                            <div className="join join-vertical lg:join-horizontal">
                                <button className="btn join-item" onClick={handleDecrease}>-</button>
                                <div className="flex text-center items-center w-10 join-item justify-center">
                                    <p>{count}</p>
                                </div>
                                <button className="btn join-item" onClick={handleIncrease}>+</button>
                            </div>
                        </div>
                        <div className='flex rounded-lg outline items-center flex-col gap-2 p-4 ml-4 w-full'>
                            <p>Total productos: {count * compra?.price} </p>
                            <button onClick={() => handleComprar()} className='btn btn-accent'>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
            <FooterP />
        </div>
    )

}

export default ComprarProducto