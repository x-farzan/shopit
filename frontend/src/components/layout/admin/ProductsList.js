import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletingProductRequest, gettingAllProductsAdminRequest, clearingAdminErrors } from "../../../store/admin"
import { MDBDataTable } from "mdbreact"
import Error from "../products/Error"
import { Link, useHistory } from 'react-router-dom'
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'


const ProductsList = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { products, loading, deleteProduct, deleteProductLoading, deleteProductError } = useSelector(state => state.admin)
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        dispatch(gettingAllProductsAdminRequest())
        if (deleteProduct !== "" && deleteProductLoading === false) {
            setErrMsg("Product is Deleted Successfully")
            clearError()
            history.push("/admin/products")
        }
        if (deleteProductError) {
            setErrMsg(deleteProductError)
            clearError()
        }
        return () => {
            dispatch(clearingAdminErrors())
            setErrMsg("")
        }
        //eslint-disable-next-line
    }, [dispatch, deleteProduct, deleteProductError, history])
    const clearError = () => {
        setTimeout(() => {
            setErrMsg("")
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
                            disabled={deleteProductLoading ? true : false}
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

                        {errMsg ? (
                            <div className="alert alert-info">
                                {errMsg}
                            </div>
                        ) : null}
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
                </div>
            </div>
        </>
    )
}

export default ProductsList
