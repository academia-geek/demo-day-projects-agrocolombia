import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { actionListBlogAsyn } from '../../Redux/Actions/actionsBlog';
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { Carousel } from 'react-responsive-carousel';

const BlogDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    const { blog } = useSelector((store) => store.blogStore);
    const [info, setInfo] = useState()

    useEffect(() => {
        dispatch(actionListBlogAsyn())
    }, [])

    useEffect(()=>{
        blog.map((b) => {
            if (b.id === id) {
                setInfo(b)
            }
        })
    }, [blog])

    return (
        <div>
            <NavbarP/>
            <div className='p-10'>
                <div className='p-10 shadow-2xl shadow-neutral rounded-lg '>
                    <div>
                        <button onClick={() => navigate("/blog")} className='btn btn-error'>Volver</button>
                    </div>
                    <div>
                        <p className='text-5xl'>{info?.titulo}</p>
                    </div>
                    <div className='my-6'>
                        <p>{info?.contenido}</p>
                    </div>
                    <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={false}>
                        {info?.media.map((u,index)=>(
                            <div key={index}>
                                <img style={{ height: 500, objectFit: "contain" }} className="rounded-lg" src={u} alt='' />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <FooterP/>
        </div>
    )
}

export default BlogDetail