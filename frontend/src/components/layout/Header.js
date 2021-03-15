import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark  mb-3">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <i className="fas fa-cart-plus text-warning"></i>
                     &nbsp; &nbsp;ShopIT</Link>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navBarNav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" >
                            <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
                        </li>
                        <li className="nav-item about">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item services">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item contact">
                            <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link>
                        </li>
                        <li className="nav-item contact">
                            <Link className="nav-link" to="/cart"><i className="fas fa-cart-plus"></i> Cart</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


export default Header
