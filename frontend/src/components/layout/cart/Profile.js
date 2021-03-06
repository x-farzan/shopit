import React from 'react'
import { useSelector } from 'react-redux'
import Error from '../products/Error'
import { Link } from 'react-router-dom'
import Metadata from '../products/Metadata'
const Profile = () => {
    const { res } = useSelector(state => state.auth.login)

    return (
        <>
            <Metadata title="My Profile" />

            {res !== null ? (
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row py-3">
                        <div className="col-md-6 text-center">
                            <div className="h2">My Profile</div>
                            <img
                                src={res.avatar.url}
                                alt={res.name}
                                style={{ width: "50%", height: "50%", borderRadius: "50%" }}
                            />
                            <Link to="/update-profile"
                                className="btn my-2 btn-warning btn-block mt-2 w-50 mx-auto"
                            >
                                Edit Profile
                            </Link>
                        </div>
                        <div className="col-md-6 text-left py-5">
                            <div className="my-5">
                                <h3>Full Name</h3>
                                <p>{res.name}</p>
                            </div>
                            <div className="my-5">
                                <h3>Email Address</h3>
                                <p>{res.email}</p>
                            </div>
                            <div className="my-5">
                                <h3>Joined On</h3>
                                <p>{String(res.createdAt).substring(0, 10)}</p>
                            </div>
                            {res.role !== "admin" && (
                                <Link to="/orders/me" className="btn btn-primary btn-block w-75 mx-auto">
                                    My Orders
                                </Link>
                            )}
                            <Link to="/change/password" className="btn btn-danger btn-block w-75 mx-auto">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </>
    )
}

export default Profile
