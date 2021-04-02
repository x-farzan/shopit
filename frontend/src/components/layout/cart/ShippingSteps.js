import React from 'react'
import { Link } from 'react-router-dom'
const ShippingSteps = ({ shipping, confirmOrder, payment }) => {
    const rightArrow = {
        width: "11%",
        height: "90%",
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderLeft: "40px solid #ffc107"
    }
    const part = {
        width: "80%",
        height: "80%",
        marginTop: "auto",
        marginBottom: "auto"
    }
    const rightArrowDim = {
        width: "11%",
        height: "90%",
        borderTop: "40px solid transparent",
        borderBottom: "40px solid transparent",
        borderLeft: "40px solid #eee"
    }
    const partDim = {
        width: "80%",
        height: "80%",
        marginTop: "auto",
        marginBottom: "auto",
        backgroundColor: "#eee",
        color: "#000"
    }
    return (
        <div className="d-flex container" style={{ width: "600px" }}>
            {shipping ? (
                <Link to='/shipping'>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={part} className="h6 px-3 bg-warning py-3 mid text-light text-center ">Shipping</div>
                        <div style={rightArrow} className="right"></div>
                    </div>
                </Link>
            ) : (
                <Link to='#' disabled style={{ textDecoration: "none" }}>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={partDim} className="h6 px-3 py-3 mid text-light text-center ">Shipping</div>
                        <div style={rightArrowDim} className="right"></div>
                    </div>
                </Link>
            )}
            {confirmOrder ? (
                <Link to='/confirm/order'>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={part} className="h6 px-3 bg-warning py-3 mid text-light text-center ">Confirm Order</div>
                        <div style={rightArrow} className="right"></div>
                    </div>
                </Link>
            ) : (
                <Link to='#' disabled style={{ textDecoration: "none" }}>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={partDim} className="h6 px-3 py-3 mid text-light text-center ">Confirm Order</div>
                        <div style={rightArrowDim} className="right"></div>
                    </div>
                </Link>
            )}
            {payment ? (
                <Link to='/payment'>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={part} className="h6 px-3 bg-warning py-3 mid text-light text-center ">Payment</div>
                        <div style={rightArrow} className="right"></div>
                    </div>
                </Link>
            ) : (
                <Link to="#" disabled style={{ textDecoration: "none" }}>
                    <div className="container d-flex justify-content-start align-items-center" style={{ height: "100%", width: "100%" }}>
                        <div style={partDim} className="h6 px-3 py-3 mid text-light text-center ">Payment</div>
                        <div style={rightArrowDim} className="right"></div>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default ShippingSteps
