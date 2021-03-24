import React from 'react'
import Metadata from '../layout/products/Metadata'

const Contact = () => {
    return (
        <>
            <Metadata title="Contact us" />
            <div className='container'>
                <p className="display-4 text-center">Contact Us </p>
                <hr />
                <div className="card">
                    <div className="card-body">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Comment</label>
                                <textarea name="comment" cols="30" rows="10" className="form-control"></textarea>
                            </div>
                            <input type="submit" value="Submit" className="btn btn-dark btn-block" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
