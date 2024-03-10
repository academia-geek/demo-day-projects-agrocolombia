import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import NavbarP from '../../Components/NavbarP';
import FooterP from '../../Components/FooterP';
import { actionListCombosAsyn } from '../../Redux/Actions/actionsCombo';
import { Carousel } from 'react-responsive-carousel';
import { actionListproductAsyn } from '../../Redux/Actions/actionsProduct';

const ComprarCombo = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const { products } = useSelector((store) => store.productStore);
    const { combos } = useSelector((store) => store.combosStore);
    const [infop, setInfop] = useState();
    const [compra, setCompra] = useState();
    
    useEffect(() => {
        dispatch(actionListproductAsyn())
        dispatch(actionListCombosAsyn())
        if (combos !== 0) {
            combos?.map((p) => {
                if (p.id === id) {
                    setCompra(p);
                }
            })
        }
        let cosas=[];
        if (products !== 0) {
            compra?.productos?.map((p) => {
                products?.map((x) => {
                    //console.log(x.id, p)
                    if (x.id === p) {
                        cosas.push(x);
                    }
                })
            })
        }
        setInfop(cosas);
    }, []);

  return (
    <div>
        <NavbarP/>
          <div className='w-3/12 bg-accent fondo verde'>
  
          </div>
          <div className='grid grid-cols-2 gap-4 w-9/12'>
            <div>
                <Carousel style={{ width: 300 }} showArrows={true} emulateTouch showThumbs={true} thumbWidth={100}>
                  {compra?.media?.map((i, index) => (
                    <div key={index}>
                      <img style={{ width: 200, objectFit: "cover" }} className="rounded-lg" src={i} alt='' />
                    </div>
                  ))}
                </Carousel>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                {compra?.name.charAt(0).toUpperCase() + compra?.name.slice(1)}
                </h2>
                <p>{compra?.desc}</p>
                <h2>Contenido</h2>
                <div>
                    {console.log(infop)}
                    {infop?.map((i) =>(
                        <p>{i.name}</p>
                    ))}
                </div>
                <div className='flex rounded-lg outline items-center flex-col gap-2 p-4 ml-4 w-fit'>
                    <p>Total productos: {compra?.precio} </p>
                    <button className='btn btn-accent'>Comprar</button>
                </div>
            </div>
          </div>
        <FooterP />
      </div>
  )
}

export default ComprarCombo