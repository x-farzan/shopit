import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../../store/productDetails'
import { addProductToCart } from '../../../store/cart'
import Error from './Error'
import Metadata from './Metadata';
import { Rating } from './Rating';
import ReviewModel from './ReviewModel';

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const initialState = {
        color: "",
        msg: ""
    }
    const [noti, setNoti] = useState({ color: "", msg: "" })
    useEffect(() => {
        dispatch(getProductDetails(`/api/v1/product/${match.params.id}`))
    }, [dispatch, match.params.id])

    const productDetail = useSelector(state => state.entities.productDetail)
    const cart = useSelector(state => state.entities.cart.list)
    const loaded = useRef(false);

    useEffect(() => {
        if (loaded.current) {
            const data = { ...noti }
            data.color = "success";
            data.msg = "This Product is added to the cart"
            setNoti(data)
            setTimeout(() => {
                setNoti(initialState)
            }, 2000);
        } else {
            loaded.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.length]);
    useEffect(() => {
        return () => {
            setNoti(initialState)
        }
        //eslint-disable-next-line
    }, [])
    const { description, name, numOfReviews, price, rating, stock, _id, seller } = productDetail.data
    const incrementQty = () => {
        setCount(Math.min(Number(stock), count + 1))
    }
    const decrementQty = () => {
        setCount(Math.max(Number(""), count - 1))
    }
    const addToCart = (e) => {
        const item = cart.find(i => i._id === match.params.id)
        if (item) {
            const data = { ...noti }
            data.color = "danger";
            data.msg = "This Product is already added to the cart"
            setNoti(data)
            setTimeout(() => {
                setNoti(initialState)
            }, 2000);
            return
        }
        dispatch(addProductToCart(match.params.id, count, price))
    }
    return (
        <>
            <Metadata title="Product Detail" />
            {productDetail.loading ? (<Error />) : (
                <div className='container'>
                    {noti.msg &&
                        <div className={`alert alert-${noti.color} text-center display-block`}>
                            {noti.msg}
                        </div>
                    }
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
                            <button
                                className={`btn btn-sm btn-danger ${stock === 0 ? "disabled" : ""}`}
                                onClick={decrementQty}
                            >-</button>
                            <span className='mx-2'>{count}</span>
                            <button
                                className={`btn btn-sm btn-primary ${stock === 0 ? "disabled" : ""}`}
                                onClick={incrementQty}
                            >+</button>
                            <button
                                className={`btn btn-sm btn-warning ml-5 ${stock === 0 || count === 0 ? "d-none" : ""}`}
                                onClick={addToCart}
                            >
                                Add to Cart
                                </button>

                            <h6 className='my-2'>Status:
                            <span className={`mx-2 ${stock === 0 ? "text-danger" : "text-success"}`}>
                                    {stock !== 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </h6>
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
