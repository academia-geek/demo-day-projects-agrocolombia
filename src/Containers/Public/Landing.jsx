import React, { useEffect, useState } from 'react'
import NavBarLanding from '../../Components/NavBarLanding'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FotterLanding from '../../Components/FotterLanding';
import { useDispatch, useSelector } from 'react-redux';
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Landing = () => {

    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const [actual, setActual] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(actionListproductAsyn())
        const aut = getAuth()
        if (aut.currentUser?.uid) {
            navigate("/*")
        }
    }, [])

    return (
        <div className="w-full min-h-screen bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/dlwr6vxib/image/upload/v1709742810/Guajolota/hermoso-paisaje-verde-rodeado-altas-montanas-cielo-nublado_1_rmpyic.jpg')]">
            <div className="h-full w-full">
                <NavBarLanding />
                <div className='lg:p-10 flex flex-col gap-5 p-5 w-full justify-center lg:flex-row'>
                    <div className='lg:w-1/2 w-full flex justify-center'>
                        <img className='w-1/2 rounded-lg lg:w-2/6' src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709743734/Guajolota/Cubo_do_Agroneg%C3%B3cio_ealovo.jpg" alt="" />
                    </div>
                    <div className='lg:w-1/2 h-auto flex flex-col justify-center'>
                        <div className='glass p-5'>
                            <p className='text-center text-3xl font-medium mb-10'>Compra o vende todo lo relacionado con la agricultura</p>
                            <Carousel className='' showArrows={true} infiniteLoop emulateTouch autoPlay>
                                {products?.map((p,index) => (
                                    <div key={`prod${index}`} onClick={() => { setActual(p); document.getElementById('my_modal_4').showModal() }}>
                                        <img className='max-h-[300px] object-contain' src={p.media[0]} alt='' />
                                        <p className="legend">{p.name}</p>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <FotterLanding />
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-5">{actual?.name}</h3>
                    <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false}>
                        {actual?.media?.map((i, index) => (
                            <div key={`modal${index}`}>
                                <img style={{ width: 400, height: 300, objectFit: "contain" }} src={i} alt='' />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex flex-col text-center items-center gap-5'>
                        <div>
                            <p className='font-medium text-xl line-clamp-3'>{actual?.desc}</p>
                        </div>
                        <button onClick={() => { document.getElementById('my_modal_4').close(); navigate(`/comprar-producto/${actual?.id}`) }} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Ver</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Landing