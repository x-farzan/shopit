import React, { useState } from 'react'
import Metadata from '../products/Metadata'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'
import Summary from './Summary'

const Cart = () => {
    const { list } = useSelector(state => state.entities.cart)
    const itemsPrice = list.map(i => i.totalPrice)
    const totalPrice = itemsPrice.reduce((a, b) => a + b, 0)

    return (
        <>
            <Metadata title="Your Cart" />
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
                            totalPrice={totalPrice}
                        />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Cart
