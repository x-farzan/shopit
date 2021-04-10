import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettingSingleOrderRequest } from "../../../store/user/order"
import Error from '../products/Error'
import OrderItems from './OrderItems'
const OrderAction = ({ match }) => {
    const dispatch = useDispatch();
    const { order, loading } = useSelector(state => state.entities.orders)
    useEffect(() => {
        dispatch(gettingSingleOrderRequest(match.params.id))
    }, [dispatch, match])

    const isPaid = order.paymentInfo && order.paymentInfo.status === "succeeded" ? true : false
    const isDelivered = order.orderStatus && order.orderStatus === "Delivered" ? true : false
    return (
        <div className="container minHeight">
            {!loading && order.user ? (
                <>
                    <h1 className="display-5 my-4">Order # {order._id}</h1>
                    <h3>Shipping Info: </h3>
                    <div className="ml-3 my-3">
                        <p><span className="font-weight-bold"> Name: </span>{order && order.user.name} </p>
                        <p><span className="font-weight-bold"> Phone: </span>{order && order.shippingInfo.phone} </p>
                        <p><span className="font-weight-bold"> Address: </span>{order && order.shippingInfo.address} </p>
                        <p><span className="font-weight-bold"> Amount: </span>{order && order.totalPrice} </p>
                    </div>
                    <hr />
                    <h3>Payment: </h3>
                    <p className="my-3 ml-5">{isPaid ? <span className="text-success font-weight-bold">PAID</span> : <span className="text-danger">NOT PAID</span>}</p>
                    <hr />
                    <h3>Order Status: </h3>
                    <p className="my-3 ml-5">{isDelivered ? <span className="text-success font-weight-bold">{order.orderStatus}</span> : <span className="text-danger font-weight-bold">{order.orderStatus}</span>}</p>
                    <h3>Order Items: </h3>
                    <div className="my-3 ml-5 row">
                        {order && order.orderItems.map(item => (
                            <OrderItems
                                key={item._id}
                                name={item.name}
                                price={item.price}
                                qty={item.qty}
                                url={item.images[0].url}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <Error />
            )}
        </div>
    )

}

export default OrderAction
