import React from 'react'
import MetaData from '../layout/MetaData'

const Home = () => {
    const image1 = {
        width: "100%",
        background: "url(/images/bag.jpg) no-repeat center center/cover",
        height: "580px"
    }
    const image2 = {
        width: "100%",
        background: "url(/images/hood.jpg) no-repeat center center/cover",
        height: "580px"
    }
    const image3 = {
        width: "100%",
        background: "url(/images/shoes.jpg) no-repeat center center/cover",
        height: "580px"
    }
    return (
        <>
            <MetaData title='By Best Products Online' />
            <div className="container">
                <div className="carousel slide mb-5" data-ride="carousel" id="slider4">
                    <ol className="carousel-indicators">
                        <li className="active" data-target="#slider4" data-slide-to="0"></li>
                        <li data-target="#slider4" data-slide-to="1"></li>
                        <li data-target="#slider4" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active " >
                            <img className="d-block img-fluid" src="/images/bag.jpg" style={image1} alt="First Slide" />
                            <div className="carousel-caption d-none d-md-block  text-light">
                                <h3>Leather Bag</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur.</p>
                            </div>
                        </div>
                        <div className="carousel-item " >
                            <img className="d-block img-fluid" src="/images/hood.jpg" style={image2} alt="Second Slide" />
                            <div className="carousel-caption d-none d-md-block  text-light">
                                <h3>Men Hoody</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur.</p>
                            </div>
                        </div>
                        <div className="carousel-item" >
                            <img className="d-block img-fluid" src="/images/shoes.jpg" style={image3} alt="Third Slide" />
                            <div className="carousel-caption d-none d-md-block  text-dark">
                                <h3>Running Shoes</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur.</p>
                            </div>
                        </div>
                    </div>

                    <a href="#slider4" className="carousel-control-prev" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a href="#slider4" className="carousel-control-next" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Home
