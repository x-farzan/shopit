import React from 'react'

const Summary = ({ length, totalPrice }) => {
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
                        <span>{length}(units)</span>
                    </p>
                    <p className="d-flex justify-content-between">
                        <span>Est. total:</span>
                        <span>  $ {totalPrice}</span>
                    </p>
                    <hr />
                </div>
                <div className="card-footer">
                    <div className="btn btn-warning btn-block">
                        Check Out
                                </div>
                </div>
            </div>
        </>
    )
}

export default Summary
