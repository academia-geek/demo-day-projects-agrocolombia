import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionDeleteBlogAsyn, actionEditBlogAsyn, actionListBlogAsyn } from '../../Redux/Actions/actionsBlog';
import NavbarP from '../../Components/NavbarP';
import FiltrosNavbar from '../../Components/FiltrosNavbar';
import FooterP from '../../Components/FooterP';
import { actionListUserAsyn } from '../../Redux/Actions/actionsUser';
import useForm from '../../Hooks/useForm';
import { FileUpload } from '../../Helpers/FileUpload';
import { Carousel } from 'react-responsive-carousel';

const MisBlogs = () => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.userStore)
  const { blog } = useSelector((store) => store.blogStore);
  const navigate = useNavigate()
  const [misBlog, setMisBlog] = useState()
  const [editBlog, setEditBlog] = useState()
  const [deleteBlog, setDeleteBlog] = useState()
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [alert, setAlert] = useState(false)

  const [formValue, handleInputChange, reset] = useForm({});

  const handleClickEdit = (b) => {
    setEditBlog(b)
    formValue.id = b.id
    formValue.contenido = b.contenido
    formValue.media = b.media
    formValue.titulo = b.titulo
  }

  const hanldeClickDelete = (b) => {
    setDeleteBlog(b)
    document.getElementById('my_modal_5').showModal()
  }

  const handleSubmitEdit = () => {
    dispatch(actionEditBlogAsyn(formValue))
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 4000);
  }

  useEffect(() => {
    dispatch(actionListBlogAsyn())
    dispatch(actionListUserAsyn())

    console.log(userData)

    let blogsP = []

    const datosasd = () => {
      userData?.blogs.map((x) => {
        blog.map((y) => {
          if (x === y.id) {
            blogsP.push(y)
          }
        })
      })
    }
    datosasd()
    setMisBlog(blogsP)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let url = ""
    const media = formValue.media
    setIsImageLoading(true);
    FileUpload(file)
      .then((resp) => {
        url = resp
        media.push(url)
        formValue.media = media;
        setIsImageLoading(false);
      })
      .catch((err) => console.warn(err));
  };


  return (
    <div>
      {alert ? (<div role="alert" className="absolute top-10 alert alert-success w-2/4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Editaste el blog con exito, los cambios pueden demorar de 1 a 2 minutos</span>
      </div>) : ("")}
      <NavbarP />
      <FiltrosNavbar />
      <div className='px-10 pb-6 pt-2 mt-6'>
        <div className='pb-10 text-5xl'>
          <p>Mis blogs</p>
        </div>
        <div className="join join-vertical lg:join-horizontal">
          <button onClick={() => navigate("/blog")} className='btn btn-neutral join-item'>Volver</button>
          <button onClick={() => navigate("/nuevo-blog")} className='btn btn-primary join-item'>Crear publicacion</button>
        </div>
        <div className='p-10'>
          {
            misBlog?.map((b,index) => (
              <div className='p-10 shadow-2xl shadow-neutral rounded-lg mb-10' key={index}>
                <div className='flex justify-between'>
                  <p className='text-3xl mb-4'>{b.titulo}</p>
                  <div className="join join-vertical lg:join-horizontal">
                    <button onClick={() => navigate(`/blog-detaitl/${b.id}`)} className='btn btn-primary join-item'>Ver</button>
                    <label onClick={() => { handleClickEdit(b) }} htmlFor="my-drawer-4" className='btn drawer-button btn-warning join-item'>Editar</label>
                    <button onClick={() => { hanldeClickDelete(b) }} className='btn btn-error join-item'>Eliminar</button>
                  </div>
                </div>
                <p className='line-clamp-2'>{b.contenido}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-2/4 min-h-full bg-base-200 text-base-content">
            <div className='p-5'>
              <p>Titulo</p>
              <input className="input input-bordered w-full max-w-xs" name='titulo' value={formValue.titulo} onChange={handleInputChange} />
              <p>Contenido</p>
              <textarea className="textarea textarea-primary w-full textarea-md h-80" name='contenido' value={formValue.contenido} onChange={handleInputChange} />
              <p>Edita tus fotos</p>
              <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
              <div className='p-10 flex justify-center'>
                {isImageLoading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true} thumbWidth={100} width={500}>
                    {formValue.media?.map((u, index) => (
                      <div key={index}>
                        <img style={{ height: 200, width: 400, objectFit: "contain" }} className="rounded-lg" src={u} alt='' />
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
              <div className="flex justify-around">
                <label htmlFor="my-drawer-4" className='btn drawer-button btn-neutral'>Cancelar</label>
                <label htmlFor="my-drawer-4" onClick={() => { handleSubmitEdit() }} className='btn drawer-butto btn-warning'>Editar</label>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Estas seguro de eliminar el blog: {deleteBlog?.titulo} </h3>
          <p className="py-4">No podras recuperarlo luego</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral">Cancelar</button>
              <button onClick={() => { dispatch(actionDeleteBlogAsyn(deleteBlog?.id))}} className="btn btn-error">CONFIRMAR</button>
            </form>
          </div>
        </div>
      </dialog>
      <FooterP />
    </div>
  )
}

export default MisBlogs