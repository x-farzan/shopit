import React from 'react'
import { useHistory } from 'react-router-dom'


const FinalSummary = ({ subTotal, shipping, totalPrice, tax }) => {
    const history = useHistory()
    const handleOnClick = () => {
        const data = {
            itemsPrice: subTotal,
            shipping,
            tax,
            totalPrice
        }
        sessionStorage.setItem("FinalOrderInfo", JSON.stringify(data))
        history.push("/payment")
    }
    return (
        <>
            <div className="card">
                <div className="card-header">
                    Order Summary
                            </div>
                <div className="card-body">
                    <hr />
                    <p className="d-flex justify-content-between">
                        <span>Subtotal:  </span>
                        <span>${subTotal}</span>
                    </p>
                    <hr />
                    <p className="d-flex justify-content-between">
                        <span>Shipping:  </span>
                        <span>${shipping}</span>
                    </p>
                    <hr />

                    <p className="d-flex justify-content-between">
                        <span>Tax: </span>
                        <span>${tax}</span>
                    </p>
                    <hr />
                    <p className="d-flex justify-content-between">
                        <span>Est. total Price:</span>
                        <span>  $ {totalPrice}</span>
                    </p>
                    <hr />
                </div>
                <div className="card-footer">
                    <button
                        onClick={handleOnClick}
                        className="btn btn-warning btn-block">
                        Proceed To Payment
                    </button>
                </div>
            </div>
        </>


    )
}

export default FinalSummary
