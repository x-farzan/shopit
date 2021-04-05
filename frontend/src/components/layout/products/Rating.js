import React from 'react'

export const Rating = ({ rating, reviews, price, appr }) => {
    const parent = {
        position: "relative",
        width: "90px",
        height: "20px",
    }
    const child = {
        position: "absolute",
        top: "0",
        right: "0",
        width: `${100 - ((rating / 5) * 100)}%`,
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.7)"
    }
    return (
        <>
            <div className="my-3 text-warning d-inline-block" style={parent} >
                <div style={child}></div>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
            </div>
            <span className='text-dark mx-1'>({reviews} reviews)</span>
            <p className={`price ${appr}`}>$ {price}</p>
        </>
    )
}
