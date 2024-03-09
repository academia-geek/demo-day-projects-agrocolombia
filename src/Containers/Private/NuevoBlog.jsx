import React, { useState } from 'react'
import NavbarP from '../../Components/NavbarP'
import FiltrosNavbar from '../../Components/FiltrosNavbar'
import FooterP from '../../Components/FooterP'
import { Carousel } from 'react-responsive-carousel'
import { useNavigate } from 'react-router-dom'
import useForm from '../../Hooks/useForm'

const NuevoBlog = () => {

  const navigate = useNavigate()
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [formValue, handleInputChange, reset] = useForm({
    titulo: "",
    contenido: "",
    media: [],
    id: crypto.randomUUID()
  });


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let url = ""
    const media = formValue.media
    setIsImageLoading(true);
    // FileUpload(file)
    //   .then((resp) => {
    //      url = resp
    //      media.push(url)
    //      formValue.media = media;
    //   })
    //   .catch((err) => console.warn(err));
    setTimeout(() => {
      formValue.media = ["https://res.cloudinary.com/dlwr6vxib/image/upload/v1709236762/Guajolota/g6ojns5bdigsrhj5rd6v.png"]
      setIsImageLoading(false);
    }, 1000);
  };

  const handleOnSubmit = () => {
    console.log(formValue)
  }

  const handleOnCancel = () => {
    navigate("/blog")
  }

  return (
    <div>
      <NavbarP/>
      <FiltrosNavbar/>
      <div className='p-10'>
        <div className='p-10 shadow-2xl shadow-neutral rounded-lg'>
          <p className='text-3xl mb-5'>Titulo de la publicacion</p>
          <input name='titulo' value={formValue.titulo} onChange={handleInputChange} type="text" placeholder="Productos recomendados" className="input input-bordered input-primary w-full " />
          <p className='text-2xl my-5'>Contenido de la publicacion</p>
          <textarea name='contenido' value={formValue.contenido} onChange={handleInputChange} className="textarea textarea-primary w-full textarea-md h-80" placeholder="Los mejores productos son..."></textarea>
          <p className='text-2xl my-5'>Añadele fotos a tu publicacion</p>
          <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
          <div className='p-10'>
            {isImageLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <Carousel showArrows={true} interval={10000} infiniteLoop emulateTouch autoPlay showThumbs={true}>
                {formValue.media?.map((u, index) => (
                  <div key={index}>
                    <img style={{ objectFit: "contain" }} className="rounded-lg" src={u} alt='' />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div className='flex justify-around'>
            <button onClick={() => { handleOnCancel() }} className='btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Cancelar</button>
            <button onClick={() => { handleOnSubmit () }} className='btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg'>Publicar</button>
          </div>
        </div>
      </div>
      <FooterP/>
    </div>
  )
}

export default NuevoBlog