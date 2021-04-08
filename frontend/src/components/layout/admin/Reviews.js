import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { deletingReviewRequest, gettingAllReviewsRequest, clearingAdminErrors } from "../../../store/admin"
import { MDBDataTable } from "mdbreact"
import { useHistory } from "react-router-dom"
import Metadata from '../products/Metadata'
const Reviews = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviews, loading, reviewLoading, error, isReviewDeleted } = useSelector(state => state.admin)
    const [msg, setMsg] = useState("")
    const [productId, setProductId] = useState("")

    useEffect(() => {
        if (error && isReviewDeleted) {
            if (error !== "No Reviews") {
                setMsg(error)
                setTimeout(() => {
                    setMsg("")
                    dispatch(gettingAllReviewsRequest(productId))
                    dispatch(clearingAdminErrors())
                }, 2000);
            }

        }
        if (error === "No Reviews") {
            setMsg(error)
            setTimeout(() => {
                setMsg("")
                dispatch(clearingAdminErrors())
            }, 2000);
        }
        // eslint-disable-next-line
    }, [error, isReviewDeleted, dispatch])
    useEffect(() => {
        return () => {
            dispatch(clearingAdminErrors())
            setMsg("")
        }
        // eslint-disable-next-line
    }, [])


    const handleOnClick = () => {
        dispatch(gettingAllReviewsRequest(productId))

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
                user: review.user,
                actions:
                    <>
                        <button
                            onClick={() => deletingReview(review._id)}
                            to="#"
                            type="button"
                            disabled={reviewLoading ? true : false}
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
        <div className="container" style={{ minHeight: "100vh" }}>
            <Metadata title="Product Reviews" />

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
            {(!loading && reviews.length !== 0) ? (
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
    )
}

export default Reviews
