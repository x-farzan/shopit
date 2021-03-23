import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchProducts } from '../../store/products'

const Search = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (keyword !== '') {
            dispatch(searchProducts(keyword))
            setKeyword("")
            history.push(`/search/${keyword}`)
        } else {
            alert("Write something for search")
        }

    }
    return (
        <div className="container">
            <form onSubmit={handleOnSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Find Products By Name..."
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="text-dark btn btn-outline-warning">Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
