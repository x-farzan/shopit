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
        return () => {
            dispatch(clearingAdminErrors())
        }
    }, [dispatch])
    const { products, loading } = useSelector(state => state.admin)
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc"
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions"
                },
            ],
            rows: []
        }
        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions:
                    <>

                        <Link to={`/admin/product/${product._id}`} className="py-1 px-2 btn btn-primary" >
                            <i className="fas fa-pencil-alt"></i>
                        </Link>

                        <Link to={`/admin/product/delete/${product._id}`} className="py-1 px-2 btn btn-danger" >
                            <i className="fa fa-trash"></i>
                        </Link>
                    </>
            })
        });
        return data
    }
    return (
        <div className="container">
            <h1 className="my-5">All Products</h1>
            {!loading ? (
                <>
                    <MDBDataTable
                        data={setProducts()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                </>
            ) : (
                <Error />
            )}
        </div>
    )
}

export default ProductsList
