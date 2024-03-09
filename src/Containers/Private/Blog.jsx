import React, { useEffect } from 'react'
import NavbarP from '../../Components/NavbarP'
import FiltrosNavbar from '../../Components/FiltrosNavbar'
import FooterP from '../../Components/FooterP'
import { useDispatch, useSelector } from 'react-redux'
import { actionListBlogAsyn } from '../../Redux/Actions/actionsBlog'
import { useNavigate } from 'react-router-dom'

const Blog = () => {

  const dispatch = useDispatch()
  const { blog } = useSelector((store) => store.blogStore);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(actionListBlogAsyn())
  }, [])

  return (
    <div>
      <NavbarP/>
      <FiltrosNavbar/>
      <div className='px-10 pb-8 pt-5 mt-6'>
        <div className='pb-10 text-5xl'>
          <p>Blog</p>
        </div>
        <div>
          <button onClick={() => navigate("/nuevo-blog")} className='btn btn-primary'>Crear publicacion</button>
        </div>
        <div className='p-10'>
          {blog?.map((b,index) => (
            <div className='p-10 shadow-2xl shadow-neutral rounded-lg cursor-pointer' key={index} onClick={() => navigate(`/blog-detaitl/${b.id}`)}>
              <p className='text-3xl mb-4'>{b.titulo}</p>
              <p className='line-clamp-2'>{b.contenido}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterP/>
    </div>
  )
}

export default Blog