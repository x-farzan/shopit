import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Btn from './Btn';

const Pagination = () => {
    const productsCount = useSelector(state => state.entities.products.list.length)

    const [prodPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

    // const handlePageChange = page => {
    //     // console.log(page)
    // }
    return (
        <div className="button-toolbar container">
            <div className="btn-group mr-2 mb-3">
                <Btn
                    totalProducts={productsCount}
                    pageSize={prodPerPage}
                    currentPage={currentPage}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

        </div>
    )
}
export default Pagination
