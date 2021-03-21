import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container">
                <a href="/" className="navbar-brand">Navbar</a>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navBarNav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/auth">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
