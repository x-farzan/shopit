import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
    deletingOrderRequest,
    resetDeleteOrderError,
    gettingAllOrders,
    resetGetOrdersError
} from "../../../store/admin/orders/order"

import Error from "../products/Error"
import { MDBDataTable } from "mdbreact"
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'
import { useHistory } from "react-router-dom"
const Orders = () => {
    const history = useHistory()
    const dispatch = useDispatch()


    const { orders, gOLoading, gOError, dOLoading, dOError, isDeleted } = useSelector(state => state.newAdmin.orders)
    const [msg, setMsg] = useState("")
    useEffect(() => {
        if (isDeleted) {
            setMsg("Ordr is Removed Successfully")
            setTimeout(() => {
                setMsg("")
                dispatch(resetDeleteOrderError())
            }, 2000)
        }
        if (gOError) {
            setMsg(gOError)
            setTimeout(() => {
                setMsg("")
                history.push('/dashboard')
            }, 2000)
        }
        if (dOError) {
            setMsg(dOError)
            setTimeout(() => {
                setMsg("")
                history.push('/admin/orders')
            }, 2000)
        }
        return () => {
            dispatch(resetGetOrdersError())
        }

        //eslint-disable-next-line
    }, [dispatch, isDeleted, gOError, dOError])
    useEffect(() => {
        dispatch(gettingAllOrders())
        dispatch(resetGetOrdersError())
        dispatch(resetDeleteOrderError())
        //eslint-disable-next-line
    }, [])
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: "orderId",
                    sort: "asc"
                },
                {
                    label: "Categories",
                    field: "categories", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "No Of Items",
                    field: "noOfItems", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions"
                },
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows.push({
                orderId: order._id,
                categories: order.orderItems.length,
                noOfItems: order.orderItems.map(item => item.qty).reduce((a, b) => a + b, 0),
                amount: `$${order.totalPrice}`,
                status: <>
                    {
                        order.orderStatus === "Processing" ?
                            <span className="text-danger"> {order.orderStatus}</span>
                            : <span className="text-success">{order.orderStatus}</span>
                    }
                </>,
                actions:
                    <>

                        <Link to={`/admin/order/${order._id}`} className="mx-2 py-1 px-2 btn btn-primary" >
                            <i className="fas fa-eye"></i>
                        </Link>
                        <button
                            onClick={() => deletingOrder(order._id)}
                            to="#"
                            type="button"
                            disabled={dOLoading ? true : false}
                            className="py-1 px-2 btn btn-danger" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        });
        return data
    }
    const deletingOrder = (id) => {
        dispatch(deletingOrderRequest(id))
    }
    return (
        <>
            <Metadata title="Orders" />
            <div className="row minHeight">
                <div className="col-12 col-md-3 bg-dark" style={{ marginTop: "-1rem" }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-7">
                    {msg && <div className="alert alert-info">{msg}</div>}
                    <div >
                        <h1 className="my-5">All Orders</h1>
                        {gOLoading ? (<Error />) : (
                            <>

                                <MDBDataTable
                                    data={setOrders()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Orders
