import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { gettingAllProductsAdminRequest, resetGetProducts } from "../../../store/admin/products/getProducts"
import { deletingProductRequest, resetDeleteProduct } from "../../../store/admin/products/deleteProduct"

import { MDBDataTable } from "mdbreact"
import Error from "../products/Error"
import { Link, useHistory } from 'react-router-dom'
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'


const ProductsList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { products, gPLoading, gPError } = useSelector(state => state.newAdmin.products.getProducts)
    const { deleteProduct, dPLoading, dPError } = useSelector(state => state.newAdmin.products.deleteProduct)
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        dispatch(gettingAllProductsAdminRequest())
        if (deleteProduct) {
            setErrMsg(deleteProduct)
            clearError()
        }
        if (dPError) {
            setErrMsg(dPError)
            clearError()

        }
        if (gPError) {
            setErrMsg(gPError)
            clearError()

        }
        return () => {
            setErrMsg("")
        }
        //eslint-disable-next-line
    }, [dispatch, deleteProduct, dPError, history, gPError])
    useEffect(() => {
        dispatch(resetDeleteProduct())
        dispatch(resetGetProducts())

        //eslint-disable-next-line
    }, [])
    const clearError = () => {
        setTimeout(() => {
            setErrMsg("")
            history.push("/admin/products")
        }, 2000);
    }

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

                        <Link to={`/admin/product/update/${product._id}`} className="py-1 px-2 btn btn-primary" >
                            <i className="fas fa-pencil-alt"></i>
                        </Link>

                        <button
                            onClick={() => deletingProduct(product._id)}
                            to="#"
                            type="button"
                            disabled={dPLoading ? true : false}
                            className="py-1 px-2 btn btn-danger" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        });
        return data
    }
    const deletingProduct = (id) => {
        dispatch(deletingProductRequest(id))
    }
    return (
        <>
            <Metadata title="All Products" />

            <div className="row" style={{ marginTop: "-1rem" }}>
                <div className="col-12 col-md-3 bg-dark">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-7">
                    <div className="container">

                        {errMsg &&
                            <div className="alert my-3 alert-info">
                                {errMsg}
                            </div>
                        }
                        <h1 className="my-5">All Products</h1>
                        {!gPLoading ? (
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
                </div>
            </div>
        </>
    )
}

export default ProductsList
