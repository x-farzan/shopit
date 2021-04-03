import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import useWebAnimations from "@wellyshen/use-web-animations";


const PaymentSuccess = () => {

    return (
        <div className="container pt-5" style={{ minHeight: "100vh" }}>
            <div className="animate__animated animate__backInDown d-flex target flex-column align-items-center justify-content-center">
                <i style={{ fontSize: "20rem" }} className="fas text-success my-auto fa-check-circle"></i>
                <h3>Your Order Has Been Placed Successfully</h3>
                <h3>Go to <br /> <Link style={{ fontSize: "20px" }} to='/orders'>Your Orders</Link></h3>
            </div>
        </div>
    )
}

export default PaymentSuccess
