import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../../store/productDetails'
import { addProductToCart } from '../../../store/cart'
import Error from './Error'
import Metadata from './Metadata';
import { Rating } from './Rating';
import ReviewModel from './ReviewModel';
import Reviews from './Reviews';
import Slider from './Slider';

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch()
    const { review } = useSelector(state => state.entities.reviews)

    const [count, setCount] = useState(0)
    const initialState = {
        color: "",
        msg: ""
    }
    const [noti, setNoti] = useState({ color: "", msg: "" })

    useEffect(() => {

        dispatch(getProductDetails(`/api/v1/product/${match.params.id}`))

    }, [dispatch, match.params.id, review])

    const { data, loading } = useSelector(state => state.entities.productDetail)
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
    // const {
    //     description,
    //     name,
    //     numOfReviews,
    //     price,
    //     rating,
    //     stock,
    //     _id,
    //     seller,
    //     reviews,
    //     images
    // } = data

    const incrementQty = () => {
        setCount(Math.min(Number(data.stock), count + 1))
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
        dispatch(addProductToCart(match.params.id, count, data.price))
    }
    return (
        <div className="container">
            <Metadata title="Product Detail" />
            {loading ? (<Error />) : (
                <div className='container'>
                    {noti.msg &&
                        <div className={`alert alert-${noti.color} text-center display-block`}>
                            {noti.msg}
                        </div>
                    }
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="carousel slide mb-5" data-ride="carousel" id="slider4">
                                <div className="carousel-inner">
                                    {data && data.images.map((img, index) => (
                                        <Slider
                                            key={img._id}
                                            url={img.url}
                                            index={index}
                                        />
                                    ))}
                                </div>
                                <a href="#slider4" className="carousel-control-prev" data-slide="prev">
                                    <span style={{ backgroundColor: "#000" }} className="carousel-control-prev-icon"></span>
                                </a>
                                <a href="#slider4" className="carousel-control-next" data-slide="next">
                                    <span style={{ backgroundColor: "#000" }} className="carousel-control-next-icon"></span>
                                </a>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <h3 className="card-title">
                                {data && data.name}
                            </h3>
                            <small className='muted'>Product Id {data && data._id}</small>
                            <hr />
                            <Rating rating={data && data.rating} reviews={data && data.numOfReviews} price={data && data.price} appr='h1' />
                            <hr />
                            <button
                                className={`btn btn-sm btn-danger ${data && data.stock === 0 ? "disabled" : ""}`}
                                onClick={decrementQty}
                            >-</button>
                            <span className='mx-2'>{count}</span>
                            <button
                                className={`btn btn-sm btn-primary ${data && data.stock === 0 ? "disabled" : ""}`}
                                onClick={incrementQty}
                            >+</button>
                            <button
                                className={`btn btn-sm btn-warning ml-5 ${data && (data.stock === 0 || count === 0) ? "d-none" : ""}`}
                                onClick={addToCart}
                            >
                                Add to Cart
                                </button>

                            <h6 className='my-2'>Status:
                            <span className={`mx-2 ${data && data.stock === 0 ? "text-danger" : "text-success"}`}>
                                    {data && data.stock !== 0 ? "In Stock" : "Out of Stock"}
                                </span>
                            </h6>
                            <hr />
                            <h3>Description:</h3>
                            <p>{data && data.description}</p>
                            <hr />
                            <p className="my-3">Sold By: <span className="h5">{data && data.seller}</span> </p>
                            <ReviewModel
                                productId={match.params.id}
                            />
                        </div>
                    </div>

                </div>
            )}
            {data && data.reviews && data.reviews.length !== 0 &&
                <>
                    <h1>Other's Reviews</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div >
                                {data && data.reviews && data.reviews.map(review => (
                                    <Reviews
                                        key={review._id}
                                        name={review.name}
                                        rating={review.rating}
                                        comment={review.comment}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProductDetails
