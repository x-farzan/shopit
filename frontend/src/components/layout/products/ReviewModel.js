import React, { useEffect, useState } from 'react'
import './review.css'
import { creatingReviewRequest, clearingReviewErrors } from "../../../store/user/review"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const ReviewModel = ({ productId }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(clearingReviewErrors())
        }
    }, [dispatch])
    const { res } = useSelector(state => state.auth.login)
    const parent = {
        position: "relative",
        width: "100%",
        height: "20px",
    }
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState("")

    function setUserRatings(e) {
        const stars = document.querySelectorAll('div.reviewModel .fa-star')
        stars.forEach(function (star, index) {
            star.starValue = index + 1;

            ["click", "mouseover", "mouseout"].forEach(function (e) {
                star.addEventListener(e, handleRatings)
            })
        })
        function handleRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add("orange")
                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add("yellow")
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove("yellow")
                }
            })
        }
    }
    const handleOnSubmit = (e) => {
        if (!rating) return null
        if (!comment || comment.length < 1) return null
        const formData = new FormData()

        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', productId)
        dispatch(creatingReviewRequest(formData))
        setComment("")
        setRating(1)
    }
    const handleClosing = (e) => {
        setComment("")
        setRating(1)
    }
    return (
        <div className="my-5">
            {res ? (
                <button onClick={setUserRatings} className="btn btn-warning" data-toggle="modal" data-target="#reviewModal">Submit Your Review</button>
            ) : (
                <div className="alert alert-danger">Please <Link to='/auth'>Login</Link> to create the review</div>
            )}
            <div className="modal" id="reviewModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Submit Your Reviews</h5>
                            <button onClick={handleClosing} className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <>
                                <div className="my-3 text-warning d-inline-block reviewModel" style={parent} >

                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                            </>
                            <div className="form-group my-5">
                                <label htmlFor="name">Review</label>
                                <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} cols="30" rows="2" className="form-control"></textarea>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-warning" data-dismiss="modal" onClick={handleOnSubmit} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewModel
