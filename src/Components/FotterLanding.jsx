import React from 'react'
import { Link } from 'react-router-dom'

const FotterLanding = () => {
    return (
        <footer className="footer p-10 bg-primary/80 obsolute bottom-0 text-white">
            <aside>
                <img alt="icon" className="size-12" src="https://res.cloudinary.com/dlwr6vxib/image/upload/v1709572838/Guajolota/logo_tayiwj.png"></img>
                <p>ACME Industries Ltd.<br />Providing reliable tech since 1992</p>
            </aside>
            <nav>
                <h6 className="footer-title">Unete a la comunidad</h6>
                <div className="grid grid-flow-row gap-4">
                    <Link to="/login">Inicia sesión</Link>
                    <Link to="/register">Registrate</Link>
                    <Link to="/vende">Vende</Link>
                </div>
            </nav>
        </footer>
    )
}

export default FotterLanding