import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetail } from '../../actions/productActions'
const ProductDetail = ({ match }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
    }, [dispatch, match.params.id])
    const product = useSelector(state => state.productDetail)
    const { name, rating, price, stock, numOfReviews, description, images, reviews, _id } = product.product
    console.log(product.product)
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 col-sm-12">

                    <img src="https://source.unsplash.com/random/300x200" alt="" />
                </div>
                <div className="col-md-6 col-sm-12 my-5">
                    <div className="card p-3">
                        <div className="card-body">
                            <h4 className="card-title">{name}</h4>
                            <h6 className="text-muted">product# {_id}</h6>
                            <hr />
                            <h6 className="text-warning">{rating} ({numOfReviews}reviews)</h6>
                            <hr />
                            <h2>${price}</h2>
                            <br />
                            <button className="btn btn-danger btn-sm mr-1">-</button>
                            quantity
                            <button className="btn btn-primary btn-sm ml-1">+</button>
                            <button className="ml-3 btn btn-warning btn-sm">Add to Cart</button>
                            <hr />
                            <p>Status: {stock === 0 ? "Out of Stock" : "In Stock"}</p>
                            <hr />
                            <h3>Description:</h3>
                            <p>{description}</p>
                            <p className="card-text ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
