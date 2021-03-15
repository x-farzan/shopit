import React, { useEffect } from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import Error from './Error'

const Products = () => {
    const products = useSelector(state => state.products.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className='container'>
            <div className='row align-items-center'>
                {products ? (
                    products.map(item => (
                        <Product
                            key={item._id}
                            name={item.name}
                            price={item.price}
                            rating={item.rating}
                            reviews={item.numOfReviews}
                            id={item._id}
                        />
                    ))) : (
                        <Error />
                    )}
            </div>
        </div>
    )
}

export default Products
