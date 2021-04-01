import React, { useEffect, useState } from 'react'
import { changeItems } from '../../../store/cart'
import { useDispatch } from "react-redux"
const CartItem = ({ name, price, stock, qty, id }) => {
    const dispatch = useDispatch()

    const [count, setCount] = useState(qty)

    useEffect(() => {
        dispatch(changeItems({ id, qty: count, price }))

        //eslint-disable-next-line
    }, [count])
    const incrementQty = () => {
        setCount(Math.min(Number(stock), count + 1))
    }
    const decrementQty = () => {
        setCount(Math.max(Number("1"), count - 1))
    }
    return (
        <div>
            <hr />
            <div className="d-flex align-items-center">
                <div className="col-md-3">
                    <img src='/airpods3.jpg' width="80%" height="80%" alt="" />
                </div>
                <div className="col-md-3">
                    {name}
                </div>
                <h4 className="col-md-2 text-warning">
                    <span className="mb-3">$ {price} </span>
                </h4>
                <div className="col-md-3">
                    <button
                        className={`btn btn-sm btn-danger ${stock === 0 ? "disabled" : ""}`}
                        onClick={decrementQty}
                    >-</button>
                    <span className='mx-2'>{count}</span>
                    <button
                        className={`btn btn-sm btn-primary ${stock === 0 ? "disabled" : ""}`}
                        onClick={incrementQty}
                    >+</button>
                    <p className="mt-3">total: $ {price * count}</p>
                </div>
                <div className="col-md-1 text-danger">
                    <i className="fas fa-trash-alt"></i>
                </div>
            </div>
            <hr />

        </div>
    )
}

export default CartItem
