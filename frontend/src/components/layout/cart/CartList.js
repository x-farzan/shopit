import React from 'react'

const CartList = ({ name, qty, price, totalPrice, url }) => {
    return (
        <>
            <div className="col-3">
                <img src={url} width="60%" height="60%" alt="" />
            </div>
            <div className="col-5">
                {name}
            </div>
            <div className="col-4">
                {qty} x ${price} = ${totalPrice}
            </div>

        </>
    )
}

export default CartList
