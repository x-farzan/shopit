import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Error from './Error'
import Metadata from './Metadata'
import Product from './Product'

const Result = () => {
    const products = useSelector(state => state.entities.products)
    return (
        <>
            <Metadata title="Searched Products" />
            {products.search.length === 0 ? (
                <div className='h2 m-3' style={{ height: '80vh' }}>This product is not present
            back to <Link to='/products' >Products</Link>
                </div>
            ) : (
                products.loading ? (<Error />) : (
                    <div className="col-md-8 d-flex flex-wrap">
                        {products.search.map(product => (
                            <Product
                                key={product._id}
                                id={product._id}
                                price={product.price}
                                reviews={product.numOfReviews}
                                name={product.name}
                                rating={product.rating}
                                wide="col-md-4"
                                url={product.images[0].url}
                            />
                        ))}
                    </div>
                )
            )}

        </>
    )
}

export default Result
