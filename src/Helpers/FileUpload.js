export const FileUpload = async (file) => {
    const urlCloudinary = "https://api.cloudinary.com/v1_1/dlwr6vxib/upload";
  
    const formData = new FormData();
    // donde la voy a conectar o enviar
    formData.append("upload_preset", "Guajolota");
    //lo que quiero enviar o subir
    formData.append("file", file);
  
    const resp = await fetch(urlCloudinary, {
      method: "POST",
      body: formData,
    });
    const data = await resp.json();
    return data.secure_url;
  };