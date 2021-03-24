import React from 'react'
import './review.css'

const ReviewModel = () => {
    const parent = {
        position: "relative",
        width: "100%",
        height: "20px",
    }
    // const child = {
    //     position: "absolute",
    //     top: "0",
    //     right: "0",
    //     width: "0%",
    //     height: "100%",
    //     backgroundColor: "#fff"
    // }

    return (
        <div className="my-5">
            <button className="btn btn-warning" data-toggle="modal" data-target="#reviewModal">Submit Your Review</button>

            <div className="modal" id="reviewModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Submit Your Review</h5>
                            <button className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <>
                                <div className="my-3 text-warning d-inline-block reviewModel" style={parent} >
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                {/* <ul className="rank">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul> */}

                            </>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-warning" data-dismiss="modal">Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewModel
