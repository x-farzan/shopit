import React from 'react'
import Metadata from '../products/Metadata'

const OrderStatus = ({ match }) => {
    return (
        <div className="container my-3" style={{ minHeight: "100vh" }}>
            <Metadata title="Order Detail" />

            <div className="display-4">
                Order ID # {match && match.params.id}
            </div>
        </div>
    )
}

export default OrderStatus
