import React from 'react'
import RatingStars from './RatingStars'

export const Rating = ({ rating, reviews, price, appr }) => {

    return (
        <>
            <RatingStars
                rating={rating}
            />
            <span className='text-dark mx-1'>({reviews} reviews)</span>
            <p className={`price ${appr}`}>$ {price}</p>
        </>
    )
}
