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
        <div className=''>
            <div className="
        w-full h-screen bg-no-repeat bg-cover
        bg-[url('https://res.cloudinary.com/dlwr6vxib/image/upload/v1709742810/Guajolota/hermoso-paisaje-verde-rodeado-altas-montanas-cielo-nublado_1_rmpyic.jpg')]">
                <NavBarLanding/>
                <div className='p-10 flex flex-row'>
                    <div className='basis-1/2 h-fit'>
                        <div className="artboard phone-2">
                            <img className='rounded-lg' src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709743734/Guajolota/Cubo_do_Agroneg%C3%B3cio_ealovo.jpg" alt="" />
                        </div>
                    </div>
                    <div className='basis-1/2 flex items-center'>
                        <div className='glass w-full rounded-lg p-5'>
                            <Carousel style={{ width: 300 }} showArrows={true} infiniteLoop emulateTouch autoPlay>
                                {products?.map((p)=>(
                                    <div onClick={() => { setActual(p); document.getElementById('my_modal_4').showModal() }}>
                                        <img style={{ width: 300,  objectFit: "contain" }} src={p.media[0]} alt=''/>
                                        <p className="legend">{p.name}</p>
                                    </div>
                                ))}
                            </Carousel>
                            <p className='text-center text-3xl font-medium mb-10'>Compra o vende todo lo relacionado con la agricultura</p>
                        </div>
                    </div>
                </div>
            </div>
            <FotterLanding/>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl text-center mb-5">{actual?.name}</h3>
                    <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false}>
                        {actual?.media?.map((i, index) => (
                            <div key={index}>
                                <img style={{ width: 400, height: 300, objectFit: "contain" }} src={i} alt='' />
                            </div>
                        ))}
                    </Carousel>
                    <div className='flex flex-col text-center items-center gap-5'>
                        <p className='font-medium text-xl'>{actual?.desc}</p>
                        <button onClick={() => { document.getElementById('my_modal_4').close(); navigate(`/comprar-producto/${actual?.id}`) }} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Ver</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Landing