import React from 'react'
import { Link } from "react-router-dom"
const PaymentSuccess = () => {
    console.log("hello")
    return (
        <div className="container pt-5" style={{ minHeight: "100vh" }}>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <i className="fas fa-10x  text-success my-auto fa-check-circle"></i>
                <h3>Your Order Has Been Placed Successfully</h3>
                <h3>Go to <Link to='/orders'>Your Orders</Link></h3>
            </div>
        </div>
    )
}

export default PaymentSuccess
