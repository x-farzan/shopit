import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../store/products'
import Categories from './Categories';

const Price = ({ keyword }) => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(1200)
    const dispatch = useDispatch()
    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(searchProducts(keyword, min, max))
    }
    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">Price</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-5">
                            <input
                                type="number"
                                placeholder='Min'
                                min='0'
                                className="form-control"
                                value={min}
                                onChange={e => setMin(e.target.value)} />
                        </div>
                        <div className="col-5">
                            <input
                                type="number"
                                placeholder='Max'
                                className="form-control"
                                value={max}
                                onChange={e => setMax(e.target.value)} />
                        </div>
                        <div className="col-1" >
                            <i
                                className="fas fa-chevron-circle-right text-warning fa-2x"
                                style={{ marginLeft: "-20px", cursor: "pointer" }}
                                onClick={handleOnClick}
                            ></i>
                        </div>
                        <div className="col-12 mt-5">
                            <h3>Categories</h3>
                            <Categories
                                keyword={keyword}
                                min={min}
                                max={max}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Price