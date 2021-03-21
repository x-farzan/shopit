import React from 'react'

const Product = () => {
    return (
        <div className='col-md-3'>
            <div className="card">
                <img className="card-img-top" src="/airpods3.jpg" alt="" />
                <div className="card-body">
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo, quas.</p>
                    <div className="rating my-3 text-warning">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <span className='text-dark mx-3'>(5 reviews)</span>
                    </div>
                    <p className="price h4">$ 45.67</p>
                    <button className="btn btn-warning btn-block">View Detail</button>
                </div>
            </div>
        </div>
    )
}

export default Product
