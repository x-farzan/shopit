import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ id, price, reviews, name, rating }) => {
    const parent = {
        position: "relative",
        width: "90px",
        height: "20px",
    }
    const child = {
        position: "absolute",
        top: "0",
        right: "0",
        width: `${100 - ((rating / 5) * 100)}%`,
        height: "100%",
        backgroundColor: "#fff"
    }
    return (
        <div className='col-md-4 my-3'>
            <div className="card">
                <img className="card-img-top" src="/airpods3.jpg" alt="" />
                <div className="card-body">
                    <Link to={`/product/${id}`} style={{ textDecoration: 'none' }} className="card-text d-block text-dark">{name}</Link>
                    <div className="rating my-3 text-warning d-inline-block" style={parent} >
                        <div style={child}></div>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <span className='text-dark mx-1'>({reviews} reviews)</span>
                    <p className="price h4">$ {price}</p>
                    <Link to={`/product/${id}`} className="btn btn-warning btn-block">View Detail</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
