import React from 'react'
import { Link } from "react-router-dom"


const PaymentSuccess = () => {

    return (
        <div className="container pt-5" style={{ minHeight: "100vh" }}>
            <div className="animate__animated animate__backInDown d-flex target flex-column align-items-center justify-content-center">
                <i style={{ fontSize: "20rem" }} className="fas text-success my-auto fa-check-circle"></i>
                <h3>Your Order Has Been Placed Successfully</h3>
                <Link className="animate__animated animate__bounce animate__delay-2s " style={{ fontSize: "20px" }} to='/orders/me'>Go to Orders</Link>
            </div>
        </div>
    )
}

export default PaymentSuccess
