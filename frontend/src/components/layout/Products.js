import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts, loadProductsCount } from '../../store/products'
import Error from './Error'
import Pagination from './Pagination'

const Products = () => {

    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadProductsCount())
    // }, [dispatch])
    const products = useSelector(state => state.entities.products)
    // console.log(products)
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
