import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    const linkStyle = {
        textDecoration: "none",
        color: "#fff",
        marginTop: "1rem"
    }
    const [toggleProduct, setToggleProduct] = useState(false)
    return (

        <div className="text-light container d-flex flex-column" style={{ minHeight: "100vh" }}>
            <Link style={linkStyle} to='/dashboard'><i className="fas fa-cog"></i> Dashboard</Link>

            <Link onClick={e => setToggleProduct(!toggleProduct)} to="#" style={linkStyle} type="button">
                Products <i className="fas fa-sort-down"></i>
            </Link>
            {toggleProduct ? (
                <div className="d-flex ml-5 flex-column">
                    <Link style={linkStyle} to="/admin/products"> <i className="fas fa-folder"></i> All</Link>
                    <Link to="/admin/product/new" style={linkStyle}> <i className="fas fa-plus"></i> Create</Link>
                </div>

            ) : null}
            <Link style={linkStyle} to='/admin/orders'><i className="fas fa-shopping-basket"></i> Orders</Link>
            <Link style={linkStyle} to='/admin/users'><i className="fas fa-users"></i> Users</Link>
            <Link style={linkStyle} to='/admin/orders'><i className="fas fa-star"></i> Reviews</Link>
        </div>
    )
}

export default Sidebar
