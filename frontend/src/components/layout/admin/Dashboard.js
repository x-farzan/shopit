import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from "react-redux"
import { gettingAllProductsAdminRequest, clearingAdminErrors } from "../../../store/admin"

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(gettingAllProductsAdminRequest())
    }, [dispatch])
    const { products } = useSelector(state => state.admin)

    const outOfStock = products && products.filter(product => product.stock === 0)

    return (
        <div className="row" style={{ marginTop: "-1rem" }}>
            <div className="col-12 col-md-3 bg-dark ">
                <Sidebar />
            </div>
            <div className="col-12 col-md-7 container">
                <div className="text-center"><h2>Dashboard</h2></div>
                <div className="row">
                    <div className="col-10 mx-auto card bg-primary my-5">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Total Amount</h3>
                            <h4>$ 342.34</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-success">
                        <div className="py-3 text-light card-body text-center">
                            <h3>Products</h3>
                            <h4>{products && products.length}</h4>

                            <div className="btn btn-success btn-block">Details</div>

                        </div>
                    </div>
                    <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-danger">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Orders</h3>
                            <h4>$ 342.34</h4>
                            <div className="btn btn-danger btn-block">Details</div>

                        </div>
                    </div>
                    <div className="mx-auto col-10 my-2 col-md-5 mx-auto card bg-primary">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Users</h3>
                            <h4>$ 342.34</h4>
                            <div className="btn btn-primary btn-block">Details</div>

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
        </div>
    )
}

export default Dashboard
