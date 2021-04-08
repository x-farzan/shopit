import React from 'react'
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'

const OrderStatus = ({ match }) => {
    return (
        <>
            <Metadata title="Order Detail" />
            <div className="row">
                <div className="col-12 col-md-3 bg-dark" style={{ marginTop: "-1rem" }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-7">
                    <div className="container my-3" style={{ minHeight: "100vh" }}>


                        <div className="display-4">
                            Order ID # {match && match.params.id}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderStatus
