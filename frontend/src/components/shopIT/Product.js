import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({ name, price, rating, reviews, id }) => {
    return (
        <div className="col-md-4 col-sm-12 my-2">
            <div className="card">
                <img className="card-img-top img-fluid"
                    src="https://source.unsplash.com/random/300x200" alt="" />
                <div className="card-body">
                    <Link to={`/product/${id}`} className="card-title h5">{name}</Link>
                    <h6 className="card-text text-warning">Price {price}$</h6>
                    <p>Rating {rating} ({reviews} reviews)</p>
                    <Link to={`/product/${id}`} className="btn btn-warning btn-sm">View Datails</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
