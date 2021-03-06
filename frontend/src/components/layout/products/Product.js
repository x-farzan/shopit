import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from './Rating'

const Product = ({ id, price, reviews, wide, name, rating, url }) => {
    const height = {
        width: "100%",
        height: "15vw",
        objectFit: "cover"
    }
    return (
        <div className={`${wide} my-3`}>
            <div className="d-flex flex-fill card ">
                <img style={height} className="card-img-top" src={url} alt="" />
                <div className="card-body">
                    <Link to={`/product/${id}`} style={{ textDecoration: 'none' }} className="card-text text-truncate d-block text-dark">{name}</Link>
                    <Rating rating={rating} reviews={reviews} price={price} appr='h3' />
                    <Link to={`/product/${id}`} className="btn btn-warning btn-block">View Detail</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
