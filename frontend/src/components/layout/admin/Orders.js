import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { gettingAllOrders, deletingOrderRequest, clearingAdminErrors } from "../../../store/admin"
import Error from "../products/Error"
import { MDBDataTable } from "mdbreact"
import Metadata from '../products/Metadata'

const Orders = () => {
    const dispatch = useDispatch()


    const { orders, loading, orderLoading, isDeleted } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(gettingAllOrders())
        return () => {
            dispatch(clearingAdminErrors())
        }

        //eslint-disable-next-line
    }, [dispatch, isDeleted])

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
                            disabled={orderLoading ? true : false}
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
        <div className="container" style={{ minHeight: "100vh" }}>
            <Metadata title="Orders" />

            <h1 className="my-5">All Orders</h1>
            {loading ? (<Error />) : (
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
    )
}

export default Orders
