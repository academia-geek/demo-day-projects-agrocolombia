import React from "react";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
    const navigate = useNavigate()

  return (
    <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider" style={{backgroundImage: "https://res.cloudinary.com/dyepe4ih7/image/upload/v1709825962/socialmedia/fldldxxk7zwcmogluzqp.png"}}>
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div
            className="p-4 md:p-12 text-center lg:text-left"
            style={{ backgroundColor: "#B0B0B0"}}
          >
            <div className="flex lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>
              <h1 className="text-3xl font-bold pt-8 lg:pt-0">AnaGaby.MaLo</h1>
              <button>
              <img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709781279/socialmedia/rnmfexaucktofk1erapk.png" alt="" />
              </button>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <img className="h-4 fill-current text-green-700 pr-4" src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709826115/socialmedia/x6hkkfa0rf4dm4ajmdvp.png" alt="" />
              4000 prodts en venta
            </p>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <img className="h-4 fill-current text-green-700 pr-4" src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709826115/socialmedia/x6hkkfa0rf4dm4ajmdvp.png" alt="" />
              200 combos en venta
            </p>
            {/* <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <img className="h-4 fill-current text-green-700 pr-4" src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709315673/socialmedia/nktnddnkc2ierssctj78.png" />
              78000 seguidores
            </p> */}
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <img className="h-4 fill-current text-green-700 pr-4" src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709827637/socialmedia/y27joltjfmby93eppiyo.png" />
              Piamonte, Cauca
            </p>
            <p className="pt-8 text-sm">
                Joven agrónoma, implementa tecnologías agrícolas de precisión para mejorar la rentabilidad y sostenibilidad de la finca familiar.
            </p>
            <div className="pt-12 pb-8">
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <img
            src="https://source.unsplash.com/MP0IUfwrn0A"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
        <div className={`btn btn-info absolute top-0 right-0 h-12 w-18 p-4`}>
            <button onClick={() => navigate("/landing")}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
