import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarP from "../../Components/NavbarP";
import FooterP from "../../Components/FooterP";

const OpcVenta = () => {
  const navigate = useNavigate();

  return (
    <div>
        <NavbarP/>
            <div className="flex h-screen flex-col justify-center items-center gap-5
            bg-[url('https://res.cloudinary.com/dyepe4ih7/image/upload/v1710027504/ootdmyhbhydtntvzrhqo.png')] bg-cover">
            <div style={{backgroundColor: "rgb(255,255,255,0.65)"}} className="p-5 rounded-2xl">
                <div className="indicator w-full">
                    <div className="card w-full">
                        <div className="card-body p-5">
                            <h2 className="font-semibold text-5xl text-center text-black">Escoje que quieres vender</h2> 
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent:'space-around'}}>
                    <div className="flex flex-col w-full p-4 rounded-5 lg:flex-row">
                        <div className="grid flex-grow card rounded-box place-items-center" onClick={() => navigate("/vende/producto")}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="relative">
                                <img
                                    style={{height: '210px', width: '400px'}}
                                    src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709566895/Guajolota/2021-04-19T18_54_56.661Z-papa-pastusa-paloquemao_1_q9a7ya.jpg"
                                    alt="patatas"
                                    />
                                </figure>
                                <div style={{backgroundColor: "rgb(255,255,255,0.65)"}} className="absolute top-10 left-5 rounded-xl text-black card-body flex justify-around flex-col text-center items-center cursor-pointer">
                                    <h2 className="font-semibold text-3xl font-bold">Productos</h2>
                                    <p className="font-semibold">¿Que tipo de producto deseas vender?</p>
                                </div>
                            </div>
                        </div>
                        <div className="divider lg:divider-horizontal divider-primary text-white">O</div>
                        <div className="grid flex-grow card rounded-box place-items-center" onClick={() => navigate("/vende/combo")}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="relative"><img style={{height: '210px', width: '400px'}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1710003785/oxi5pofgbadlmnexhca1.png" alt="Shoes" /></figure>
                                <div style={{backgroundColor: "rgb(255,255,255,0.65)"}} className="absolute top-10 left-8 rounded-xl text-black card-body flex justify-around flex-col text-center items-center cursor-pointer">
                                    <h2 className="font-semibold text-3xl font-bold">Combos</h2>
                                    <p className="font-semibold">¿Que tipo de combo quieres crear?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <FooterP/>
  </div>
  );
};

export default OpcVenta;
