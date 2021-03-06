import React, { useEffect } from 'react'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import Error from './Error'
import Pagination from './Pagination'
import Metadata from './Metadata'
import Search from './Search'
import { loadProductsCount } from '../../../store/user/products'

const Products = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadProductsCount())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { list, count, loading } = useSelector(state => state.entities.products)

    return (
        <>
            <Metadata title="Products" />
            <Search />
            {(loading && !count && list.length === 0) ? (<Error />) : (
                <div className="container minHeight">
                    <div className='row'>

                        {(!loading && count && list.length !== 0) && list.map(product => (
                            <Product
                                key={product._id}
                                id={product._id}
                                price={product.price}
                                reviews={product.numOfReviews}
                                name={product.name}
                                rating={product.rating}
                                wide="col-md-3"
                                url={product.images[0].url}
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
