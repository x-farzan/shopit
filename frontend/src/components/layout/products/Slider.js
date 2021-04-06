import React from 'react'

const Slider = ({ url, index }) => {
    const image = {
        width: "100%",
        height: "80%"
    }
    console.log(index)

    return (
        <>

            <div className={`carousel-item ${index === 0 ? "active" : ""}`} >
                <img className="d-block img-fluid mx-auto d-block" src={url} alt="First Slide" style={image} />
            </div>

        </>
    )
}

export default Slider
