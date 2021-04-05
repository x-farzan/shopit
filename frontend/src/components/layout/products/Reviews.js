import React from 'react'
import RatingStars from './RatingStars'

const Reviews = ({ name, rating, comment }) => {

    return (
        <>
            <hr />
            <RatingStars rating={rating} />
            <small className="mx-2">by {name}</small>
            <p className="my-2">{comment}</p>
        </>
    )
}

export default Reviews
