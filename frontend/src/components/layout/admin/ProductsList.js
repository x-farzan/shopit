import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettingAllProductsAdminRequest, clearingAdminErrors } from "../../../store/admin"
import { MDBDataTable } from "mdbreact"
import Error from "../products/Error"
import { Link } from 'react-router-dom'

const ProductsList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(gettingAllProductsAdminRequest())

    }, [dispatch])
    // const setOrders = () => {
    //     const data = {
    //         columns: [
    //             {
    //                 label: "Order ID",
    //                 field: "id",
    //                 sort: "asc"
    //             },
    //             {
    //                 label: "Num of Items",
    //                 field: "numOfItems", // this is used to connect the row and columns properly
    //                 sort: "asc"
    //             },
    //             {
    //                 label: "Amount",
    //                 field: "amount",
    //                 sort: "asc"
    //             },
    //             {
    //                 label: "Status",
    //                 field: "status",
    //                 sort: "asc"
    //             },
    //             {
    //                 label: "Actions",
    //                 field: "actions",
    //                 sort: "asc"
    //             },
    //         ],
    //         rows: []
    //     }
    //     orders.forEach(order => {
    //         data.rows.push({
    //             id: order._id,
    //             numOfItems: order.orderItems.length,
    //             amount: `$${order.totalPrice}`,
    //             status: order.orderStatus && String(order.orderStatus).includes("Delivered")
    //                 ? <p className="text-successs"> {order.orderStatus}</p>
    //                 : <p className="text-danger"> {order.orderStatus}</p>,
    //             actions:
    //                 <Link to={`/order/${order._id}`} className="btn btn-primary" >
    //                     <i className="fa fa-eye"></i>
    //                 </Link>
    //         })
    //     });
    //     return data
    // }
    return (
        <div className="container">
            {/* <h1 className="my-5">All Products</h1>
        {!loading ? (
            <>
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            </>
        ) : (
            <Error />
        )} */}
        </div>
    )
}

export default ProductsList
