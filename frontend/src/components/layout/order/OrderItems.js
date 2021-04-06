import React from 'react'

const OrderItems = ({ name, price, qty, url }) => {
    return (
        <>
            <div className="col-3">
                <img src={url} alt="" width="50%" height="50%" />
            </div>
            <div className="col-5">{name}</div>
            <div className="col-2">${price}</div>
            <div className="col-2">{qty} Piece(s)</div>
        </>
    )
}

export default OrderItems
