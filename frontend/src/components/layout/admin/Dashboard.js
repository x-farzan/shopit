import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
    return (
        <div className="row" style={{ marginTop: "-1rem" }}>
            <div className="col-5 col-md-3 bg-dark col-lg-2">
                <Sidebar />
            </div>
            <div className="col-7 col-md-7 col-lg-10 container">
                <div className="h2">Dashboard</div>
                <div className="row">
                    <div className="col-10 mx-auto card bg-primary my-5">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Total Amount</h3>
                            <h4>$ 342.34</h4>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-md-5 my-2 pt-3 mx-auto card bg-success">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Products</h3>
                            <h4>$ 342.34</h4>

                            <div className="btn btn-success btn-block">Details</div>

                        </div>
                    </div>
                    <div className="col-md-5 my-2 pt-3 mx-auto card bg-danger">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Orders</h3>
                            <h4>$ 342.34</h4>
                            <div className="btn btn-danger btn-block">Details</div>

                        </div>
                    </div>
                    <div className="col-md-5 my-2 pt-3 mx-auto card bg-primary">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Users</h3>
                            <h4>$ 342.34</h4>
                            <div className="btn btn-primary btn-block">Details</div>

                        </div>
                    </div>
                    <div className="col-md-5 my-2 pt-3 mx-auto card bg-warning">
                        <div className=" py-3 text-light card-body text-center">
                            <h3>Out Of Stock</h3>
                            <h4>4</h4>
                            <div className="btn btn-warning btn-block">Details</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
