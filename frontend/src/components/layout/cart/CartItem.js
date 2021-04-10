import React, { useEffect, useState } from 'react'
import { changeItems, removeItem } from '../../../store/user/cart'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'

const CartItem = ({ name, price, stock, qty, id, url }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.entities.cart.list)
    const history = useHistory()
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
    const handleRemoveProduct = () => {
        dispatch(removeItem({ id }))
        if (cart.length === 1) {
            history.push('/products')
        }
    }
    return (
        <div>
            <hr />
            <div className="d-flex align-items-center">
                <div className="col-md-3">
                    <img src={url} width="80%" height="80%" alt="" />
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
                    <i className="fas fa-trash-alt"
                        onClick={handleRemoveProduct}
                        style={{ cursor: "pointer" }}
                    ></i>
                </div>
            </div>
            <hr />

        </div>
    )
}

export default CartItem
