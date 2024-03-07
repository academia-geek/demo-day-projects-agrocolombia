import React from 'react'
import NavBarLanding from '../../Components/NavBarLanding'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FotterLanding from '../../Components/FotterLanding';

const Landing = () => {

    const onClickItem = ( )=> {
        console.warn("si")
    }

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
                            <Carousel showArrows={true} infiniteLoop emulateTouch autoPlay onClickItem={() => onClickItem()}>
                                <div>
                                    <img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt=''/>
                                    <p className="legend">Bulto de verduras</p>
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt='' />
                                    <p className="legend">Bulto de verduras</p>
                                </div>
                                <div>
                                    <img src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709587411/Guajolota/Fruteria_Danielaure_kghywv.jpg" alt='' />
                                    <p className="legend">Bulto de verduras</p>
                                </div>
                            </Carousel>
                            <p className='text-center text-3xl font-medium mb-10'>Compra o vende todo lo relacionado con la agricultura</p>
                        </div>
                    </div>
                </div>
            </div>
            <FotterLanding/>
        </div>
    )
}

export default Landing