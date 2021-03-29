import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dropdown = () => {
    const { res } = useSelector(state => state.auth.login)
    return (
        <>
            {res &&
                <li className="nav-item dropdown">
                    <Link
                        to="#"
                        className="nav-link dropdown-toggle" data-toggle="dropdown">
                        <img
                            src={res.avatar && res.avatar.url}
                            style={{ borderRadius: "50%", width: "10%" }}
                            alt="" />
                            &nbsp;
                            &nbsp;
                        <span className="text-truncate" style={{ width: "50%" }}>
                            {res.name}
                        </span>
                    </Link>
                    <div className="dropdown-menu">
                        <Link to="#" className="dropdown-item text-danger">Logout</Link>
                        {res && res.role !== "admin" ? (
                            <>
                                <Link to="/orders/me" className="dropdown-item">Orders</Link>
                                <Link to="/me" className="dropdown-item">Profile</Link>
                            </>
                        ) : (
                            <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                        )}

                    </div>
                </li>
            }
        </>
    )
}

export default Dropdown
