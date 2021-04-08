import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { gettingAllReviewsRequest, clearingAdminErrors } from "../../../store/admin"
import { MDBDataTable } from "mdbreact"
import Error from "../products/Error"
import { Link } from 'react-router-dom'
const Reviews = () => {
    const dispatch = useDispatch()

    const { reviews, loading } = useSelector(state => state.admin)

    useEffect(() => {

        return () => {
            dispatch(clearingAdminErrors())
        }
    }, [dispatch])
    const [productId, setProductId] = useState("")

    const handleOnClick = () => {
        dispatch(gettingAllReviewsRequest(productId))
    }
    if (reviews.length !== 0) {
        console.log(reviews)
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
                comment: `$${review.comment}`,
                user: review.user,
                actions:
                    <>
                        <button
                            // onClick={() => deletingreview(review._id)}
                            to="#"
                            type="button"
                            disabled={loading ? true : false}
                            className="py-1 px-2 btn btn-danger" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        });
        return data
    }

    return (
        <div className="container" style={{ minHeight: "100vh" }}>
            <div className="d-flex align-items-center justify-content-center">
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
