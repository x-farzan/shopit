import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './Rating'

const Product = ({ id, price, reviews, wide, name, rating }) => {

    return (
        <div className={`${wide} my-3`}>
            <div className="card animate__animated animate__headShake">
                <img className="card-img-top" src="/airpods3.jpg" alt="" />
                <div className="card-body">
                    <Link to={`/product/${id}`} style={{ textDecoration: 'none' }} className="card-text d-block text-dark">{name}</Link>
                    <Rating rating={rating} reviews={reviews} price={price} appr='h3' />
                    <Link to={`/product/${id}`} className="btn btn-warning btn-block">View Detail</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
