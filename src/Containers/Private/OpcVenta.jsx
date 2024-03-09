import React from "react";
import { useNavigate } from "react-router-dom";

const OpcVenta = () => {
  const navigate = useNavigate();

  return (
    <div>
      Escoje que quieres vender
      <p onClick={() => navigate("/vende/producto")}>Producto</p>
      <p onClick={() => navigate("/vende/combo")}>Combo</p>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <div className="flex w-full">
            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure>
                    <img
                        style={{height: '210px', width: '400px'}}
                        src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709566895/Guajolota/2021-04-19T18_54_56.661Z-papa-pastusa-paloquemao_1_q9a7ya.jpg"
                        alt="patatas"
                        />
                    </figure>
                    <div className="card-body">
                    <h2 className="card-title">Productos</h2>
                    <p>¿Que tipo de producto deseas vender?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => navigate("/vende/producto")}>Vender ahora</button>
                    </div>
                    </div>
                </div>
            </div>
        <div className="divider divider-horizontal">OR</div>
            <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img style={{height: '210px', width: '400px'}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1710003785/oxi5pofgbadlmnexhca1.png" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Combos</h2>
                        <p>¿Que tipo de combo quieres crear?</p>
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => navigate("/vende/combo")}>Crear combo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OpcVenta;
