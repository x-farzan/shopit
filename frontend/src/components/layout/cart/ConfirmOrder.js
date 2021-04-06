import React from 'react'
import ShippingSteps from './ShippingSteps'
import { useSelector } from "react-redux"
import CartList from './CartList'
import FinalSummary from './FinalSummary'

const ConfirmOrder = () => {
    const { list, shippingInfo } = useSelector(state => state.entities.cart)
    const user = useSelector(state => state.auth.login.res)

    const subtotal = list.map(list => list.totalPrice)

    const subTotalPrice = subtotal.reduce((a, b) => a + b, 0)

    const shippingPrice = subTotalPrice >= 2000 ? 0 : 200;

    const taxPrice = Number((0.05 * subTotalPrice).toFixed(2))

    const totalPrice = subTotalPrice + taxPrice + shippingPrice

    return (
        <div className="container" style={{ minHeight: "100vh" }}>
            <ShippingSteps
                shipping confirmOrder
            />
            <div className="row mt-3">
                <div className="col-md-8">
                    <div className="card">
                        <div className=" h1 card-header">
                            Shipping Info
                        </div>
                        <div className="card-body">
                            <h6 className='my-3'><span className="font-weight-bold">Name: </span> <span>{user.name}</span></h6>
                            <h6 className='my-3'><span className="font-weight-bold">Phone: </span> <span>{shippingInfo.phone}</span></h6>
                            <h6 className='my-3'><span className="font-weight-bold">Address: </span> <span>{shippingInfo.address}</span></h6>
                            <hr />
                            <h2>Your Cart Items</h2>
                            <hr />
                            <div className="row">
                                {list.map(item => (
                                    <CartList
                                        key={item._id}
                                        name={item.name}
                                        qty={item.qty}
                                        price={item.price}
                                        totalPrice={item.totalPrice}
                                        url={item.images[0].url}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <FinalSummary
                        subTotal={subTotalPrice}
                        shipping={shippingPrice}
                        tax={taxPrice}
                        totalPrice={totalPrice}
                    />
                </div>
            </div>

        </div>
    )
}

export default ConfirmOrder
