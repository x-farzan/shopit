import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { resetGetAllReview, gettingAllReviewsRequest, deletingReviewRequest, resetDeleteReview } from "../../../store/admin/reviews/reviews"

import { MDBDataTable } from "mdbreact"
// import { useHistory } from "react-router-dom"
import Metadata from '../products/Metadata'
import Sidebar from './Sidebar'
const Reviews = () => {
    const dispatch = useDispatch()

    const {
        dRLoading,
        dRError,
        isReviewDeleted,
        message,
        reviews,
        gRLoading,
        gRError
    } = useSelector(state => state.newAdmin.reviews)

    const [msg, setMsg] = useState("")
    const [productId, setProductId] = useState("")

    useEffect(() => {
        if (dRError) {
            setMsg(dRError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetDeleteReview())
            }, 2000)
        }
        if (gRError) {
            setMsg(gRError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetGetAllReview())
            }, 2000)
        }
        if (isReviewDeleted || message) {
            setMsg(message)
            setTimeout(() => {
                setMsg("")
                dispatch(resetDeleteReview())
            }, 2000)
        }
    }, [dispatch, dRError, message, gRError, isReviewDeleted])

    useEffect(() => {
        return () => {
            dispatch(resetDeleteReview())
            dispatch(resetGetAllReview())
            setMsg("")
        }
        // eslint-disable-next-line
    }, [])


    const handleOnClick = () => {
        if (productId === "") {

            setMsg("There is no Product ID is Provided")
            setTimeout(() => {
                setMsg("")
            }, 2000);

        }
        if (productId !== "") {
            dispatch(gettingAllReviewsRequest(productId))
        }
    }
    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "Review ID",
                    field: "reviewId",
                    sort: "asc"
                },
                {
                    label: "Rating",
                    field: "rating", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "Comment",
                    field: "comment",
                    sort: "asc"
                },
                {
                    label: "User",
                    field: "user",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions"
                },
            ],
            rows: []
        }
        reviews.forEach(review => {
            data.rows.push({
                reviewId: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions:
                    <>
                        <button
                            onClick={() => deletingReview(review._id)}
                            to="#"
                            type="button"
                            disabled={dRLoading ? true : false}
                            className="py-1 px-2 btn btn-danger" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        });
        return data
    }
    const deletingReview = (id) => {
        dispatch(deletingReviewRequest(productId, id))
    }

    return (
        <>
            <Metadata title="Product Reviews" />

            <div className="row">
                <div className="col-12 col-md-3 bg-dark" style={{ marginTop: "-1rem" }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-7">
                    <div className="container" style={{ minHeight: "100vh" }}>

                        <div className="d-flex flex-column align-items-center justify-content-center">
                            {msg ? (
                                <div className="alert alert-info">{msg}</div>
                            ) : null}
                            <div className="form-group">
                                <label htmlFor="productId">Product ID</label>
                                <input
                                    type="text"
                                    placeholder="Product ID"
                                    className="form-control"
                                    id="productId"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                                <div
                                    className="btn btn-primary my-3 btn-block"
                                    onClick={handleOnClick}
                                >Search</div>
                            </div>
                        </div>
                        {(!gRLoading && reviews.length !== 0) ? (
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
                            // <Error />
                            null
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews
