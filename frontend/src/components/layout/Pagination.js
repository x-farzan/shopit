import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, loadProductsCount } from '../../store/products';
import Btn from './Btn';

const Pagination = () => {
    const productsCount = useSelector(state => state.entities.products.count)

    const [prodPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = page => {
        setCurrentPage(page)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadProducts(currentPage, prodPerPage))
    }, [dispatch, currentPage, prodPerPage])

    useEffect(() => {
        dispatch(loadProductsCount())
    }, [dispatch])

    return (
        <div className="button-toolbar container">
            <div className="btn-group mr-2 mb-3">
                <Btn
                    totalProducts={productsCount}
                    pageSize={prodPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    )
}
export default Pagination
