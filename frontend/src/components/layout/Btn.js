import React from 'react'

const Btn = ({ totalProducts, pageSize, currentPage, onPageChange }) => {

    const numOfPages = Math.ceil(totalProducts / pageSize)
    if (numOfPages === 1) return null;
    const generateArray = () => {
        const arr = []
        for (let i = 1; i <= numOfPages; i++) {
            arr.push(i)
        }
        return arr
    }
    const pages = generateArray()

    return (
        <>
            {pages.map(page => (
                <button
                    key={page}
                    className={`btn btn-outline-warning text-dark ${currentPage === page ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </>
    )
}

export default Btn
