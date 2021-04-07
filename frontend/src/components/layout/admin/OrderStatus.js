import React from 'react'

const OrderStatus = ({ match }) => {
    return (
        <div className="container my-3" style={{ minHeight: "100vh" }}>
            <div className="display-4">
                Order ID # {match && match.params.id}
            </div>
        </div>
    )
}

export default OrderStatus
