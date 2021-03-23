import React from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'
import Error from './Error'
import Pagination from './Pagination'

const Products = () => {


    const products = useSelector(state => state.entities.products)

    return (
        <>
            {products.loading ? (<Error />) : (
                <div className="container">
                    <div className='row'>
                        {products.list.map(product => (
                            <Product
                                key={product._id}
                                id={product._id}
                                price={product.price}
                                reviews={product.numOfReviews}
                                name={product.name}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                </div>
            )}
            <Pagination />
        </>
    )
}

export default Products
