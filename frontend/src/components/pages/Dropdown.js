import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUserRequest } from '../../store/auth'

const Dropdown = () => {
    const dispatch = useDispatch()
    const { res } = useSelector(state => state.auth.login)

    const logoutHandler = () => {
        dispatch(logoutUserRequest())
    }
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

                        <Link to="/me" className="dropdown-item">Profile</Link>

                        {res && res.role !== "admin" ? (
                            <>
                                <Link to="/orders/me" className="dropdown-item">Orders</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/orders/me" className="dropdown-item">Orders</Link>
                                <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                            </>
                        )}
                        <Link
                            to="#"
                            className="dropdown-item
                         text-danger"
                            onClick={logoutHandler}
                        >Logout</Link>

                    </div>
                </li>
            }
        </>
    )
}

export default Dropdown
