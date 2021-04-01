import React from 'react'
import Metadata from '../products/Metadata'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import Summary from './Summary'
import Error from '../products/Error'
import { Link } from "react-router-dom"
const Cart = () => {
    const { list, loading } = useSelector(state => state.entities.cart)
    const itemsPrice = list.map(i => i.totalPrice)
    const totalUnits = list.map(i => i.qty)
    const units = totalUnits.reduce((a, b) => a + b, 0)
    const totalPrice = itemsPrice.reduce((a, b) => a + b, 0)

    return (
        <div className="container" style={{ minHeight: "100vh" }}>
            <Metadata title="Your Cart" />
            {loading ? (
                <Error />
            ) : (
                list && list.length === 0 ? (
                    <div className="h3">
                        Your Cart is empty. go to the <Link to='/products'>
                            Product
                        </Link>
                    </div>
                ) : (
                    <div className="container" style={{ minHeight: "100vh" }}>
                        <div className="row">
                            <div className="col-md-8">
                                {list.map(item => (
                                    <CartItem
                                        key={item._id}
                                        name={item.name}
                                        price={item.price}
                                        stock={item.stock}
                                        qty={item.qty}
                                        id={item._id}
                                    />
                                ))}
                            </div>
                            <div className="col-md-4" >
                                <Summary
                                    length={list.length}
                                    units={units}
                                    totalPrice={totalPrice}
                                />
                            </div>
                        </div>

                    </div>
                )
            )}
        </div>
    )
}

export default Cart
