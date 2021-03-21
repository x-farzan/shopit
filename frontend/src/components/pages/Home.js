import React from 'react';
import Metadata from '../layout/Metadata';

const Home = () => {
    const image = {
        width: "50%",
        height: "50vh"
    }

    return (
        <>
            <Metadata title="Buy Best Products Online" />
            <div className="carousel slide mb-5" data-ride="carousel" id="slider4">
                <ol className="carousel-indicators">
                    <li className="active" data-target="#slider4" data-slide-to="0"></li>
                    <li data-target="#slider4" data-slide-to="1"></li>
                    <li data-target="#slider4" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active" >
                        <img className="d-block img-fluid mx-auto d-block" src='/airpods3.jpg' style={image} alt="First Slide" />
                        <div className="carousel-caption d-none d-md-block text-dark">
                            <h3>Slider One</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block img-fluid mx-auto d-block" src='/pic1.jpg' style={image} alt="Second Slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h3>Slider two</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, consectetur.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block img-fluid mx-auto d-block" src='/shoes.jpg' style={image} alt="Third Slide" />
                        <div className="carousel-caption d-none d-md-block text-dark">
                            <h3>Slider Three</h3>
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
        </>
    )
}

export default Home
