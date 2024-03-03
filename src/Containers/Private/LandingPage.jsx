import React from "react";
import NavbarP from "../../Components/NavbarP";
import FiltrosNavbar from "../../Components/FiltrosNavbar";

const LandingPage = () => {
  return (
    <div>
      <NavbarP />
      <FiltrosNavbar />
      <div class="grid grid-cols-4 gap-4">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Shoes!
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
      </div>
    </div>
  );
};

export default LandingPage;
