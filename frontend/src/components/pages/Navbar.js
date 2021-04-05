import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dropdown from './Dropdown'

const Navbar = () => {
    const { loading, res } = useSelector(state => state.auth.login)
    const { list } = useSelector(state => state.entities.cart)
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-warning mb-3">
                <div className="container">
                    <Link to="/" className="navbar-brand">Shop IT <i className="fas fa-cart-plus"></i> </Link>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navBarNav" className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>

                            {res ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">Cart
                                        &nbsp;
                                        <i className="fas fa-shopping-cart">
                                                <span>
                                                    {list.length}
                                                </span>
                                            </i>
                                        </Link>
                                    </li>
                                    <Dropdown />
                                </>
                            ) : (!loading &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar
