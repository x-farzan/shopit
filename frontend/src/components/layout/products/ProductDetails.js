import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../../store/productDetails'
import Error from './Error'
import Metadata from './Metadata';
import { Rating } from './Rating';
import ReviewModel from './ReviewModel';

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetails(`/api/v1/product/${match.params.id}`))
    }, [dispatch, match.params.id])

    const productDetail = useSelector(state => state.entities.productDetail)
    const { description, name, numOfReviews, price, rating, stock, _id, seller } = productDetail.data
    return (
        <>
            <Metadata title="Product Detail" />
            {productDetail.loading ? (<Error />) : (
                <div className='container'>
                    <div className="row mt-3">
                        <div className="col-md-6" height="80vh">
                            <img src="/pic1.jpg" className='d-block m-auto' width='80%' height='80%' alt="Product Pic" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="card-title">
                                {name}
                            </h3>
                            <small className='muted'>Product Id {_id}</small>
                            <hr />
                            <Rating rating={rating} reviews={numOfReviews} price={price} appr='h1' />
                            <hr />
                            <button className={`btn btn-sm btn-danger ${stock === 0 ? "disabled" : ""}`}>-</button>
                            <span className='mx-2'>Quentity</span>
                            <button className={`btn btn-sm btn-primary ${stock === 0 ? "disabled" : ""}`}>+</button>
                            <button className={`btn btn-sm btn-warning ml-5 ${stock === 0 ? "disabled" : ""}`}>Add to Cart</button>
                            <h6 className='my-2'>Status: {stock !== 0 ? "In Stock" : "Out of Stock"}</h6>
                            <hr />
                            <h3>Description:</h3>
                            <p>{description}</p>
                            <hr />
                            <p className="my-3">Sold By: <span className="h5">{seller}</span> </p>
                            <ReviewModel />
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default ProductDetails
