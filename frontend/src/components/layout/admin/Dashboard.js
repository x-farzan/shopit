import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from "react-redux"
import { gettingAllProductsAdminRequest, resetGetProducts } from "../../../store/admin/products/products"
import { gettingAllOrders, resetGetOrdersError } from "../../../store/admin/orders/order"
import { gettingAllUsersRequest, resetGetAllUsers } from "../../../store/admin/users/users"
import Error from '../products/Error'
import { Link } from "react-router-dom"
import Metadata from '../products/Metadata'
const Dashboard = () => {
    const dispatch = useDispatch()
    const [msg, setMsg] = useState("")

    const { products, gPLoading, gPError } = useSelector(state => state.newAdmin.products)

    const outOfStock = products && products.filter(product => product.stock === 0)
    const { orders, gOLoading, gOError } = useSelector(state => state.newAdmin.orders)
    const { users, gULoading, gUError } = useSelector(state => state.newAdmin.users)
    const totalAmount = orders && orders.map(order => order.totalPrice).reduce((a, b) => a + b, 0)


    useEffect(() => {
        if (gPError) {
            setMsg(gPError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetGetProducts())
            }, 2000);
        }
        if (gOError) {
            setMsg(gOError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetGetOrdersError())
            }, 2000);
        }
        if (gUError) {
            setMsg(gUError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetGetAllUsers())
            }, 2000);
        }
        dispatch(gettingAllProductsAdminRequest())
        dispatch(gettingAllUsersRequest())
        dispatch(gettingAllOrders())
        return () => {
            dispatch(resetGetAllUsers())
            dispatch(resetGetProducts())
            dispatch(resetGetOrdersError())
        }
    }, [dispatch, gPError, gUError, gOError])
    return (
        <div className="row minHeight overflow" style={{ marginTop: "-1rem" }}>
            <Metadata title="Admin Dashboard" />

            <div className="col-12 col-md-3 bg-dark ">
                <Sidebar />
            </div>
            {msg && <div className="alert aler-info">{msg}</div>}
            {gPLoading || gOLoading || gULoading ? (<Error />) : (
                <div className="col-12 col-md-7">
                    <div className="text-center"><h2>Dashboard</h2></div>
                    <div className="row">
                        <div className="col-10 mx-auto card bg-primary my-5">
                            <div className=" py-3 text-light card-body text-center">
                                <h3>Total Amount</h3>
                                <h4>$ {totalAmount.toFixed(2)}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-success">
                            <div className="py-3 text-light card-body text-center">
                                <h3>Products</h3>
                                <h4>{products && products.length}</h4>

                                <Link to="/admin/products" className="btn btn-success btn-block">Details</Link>

                            </div>
                        </div>
                        <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-danger">
                            <div className=" py-3 text-light card-body text-center">
                                <h3>Orders</h3>
                                <h4>{orders && orders.length}</h4>
                                <Link to="/admin/orders" className="btn btn-danger btn-block">Details</Link>

                            </div>
                        </div>
                        <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-primary">
                            <div className=" py-3 text-light card-body text-center">
                                <h3>Users</h3>
                                <h4>{users && users.length}</h4>
                                <Link to="/admin/users" className="btn btn-primary btn-block">Details</Link>

                            </div>
                        </div>
                        <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-warning">
                            <div className=" py-3 text-light card-body text-center">
                                <h3>Out Of Stock</h3>
                                <h4>{outOfStock && outOfStock.length}</h4>
                                <div className="btn btn-warning btn-block">Details</div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
