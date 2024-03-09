import React from "react";
import { useNavigate } from "react-router-dom";

const OpcVenta = () => {
  const navigate = useNavigate();

  return (
    <div>
      Escoje que quieres vender
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <div className="flex w-full">
            <div className="grid flex-grow card rounded-box place-items-center" onClick={() => navigate("/vende/producto")}>
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure>
                    <img
                        style={{height: '210px', width: '400px'}}
                        src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709566895/Guajolota/2021-04-19T18_54_56.661Z-papa-pastusa-paloquemao_1_q9a7ya.jpg"
                        alt="patatas"
                        />
                    </figure>
                    <div className="card-body flex justify-around flex-col text-center items-center">
                        <h2 className="font-semibold text-3xl">Productos</h2>
                        <p>¿Que tipo de producto deseas vender?</p>
                    </div>
                </div>
            </div>
        <div className="divider divider-horizontal">OR</div>
            <div className="grid flex-grow card rounded-box place-items-center" onClick={() => navigate("/vende/combo")}>
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img style={{height: '210px', width: '400px'}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1710003785/oxi5pofgbadlmnexhca1.png" alt="Shoes" /></figure>
                    <div className="card-body flex justify-around flex-col text-center items-center">
                        <h2 className="font-semibold text-3xl">Combos</h2>
                        <p>¿Que tipo de combo quieres crear?</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OpcVenta;
