import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from '../../store/products'
import Error from './Error'

const Products = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch])

    const products = useSelector(state => state.entities.products)
    return (
        <>
            {products.loading ? (<Error />) : (
                <div className="container">
                    <div className='row'>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                </div>
            )}
        </>
    )
}

export default Products
