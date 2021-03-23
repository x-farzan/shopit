import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../store/products'

const Categories = ({ keyword, min, max }) => {
    const dispatch = useDispatch()
    const categories = {
        Electronics: "Electronics",
        Accessories: "Accessories",
        Food: "Food",
        Books: "Books",
        Clothes: "Clothes",
        Shoes: "Shoes",
        Beauty: "Beauty",
        Sports: "Sports"
    }
    const values = Object.values(categories)
    const [cat, setCat] = useState([])
    const handleOnClick = (e) => {
        if (cat.indexOf(e.target.value) === -1) setCat([...cat, e.target.value])
        if (cat.indexOf(e.target.value) !== -1) setCat(cat.filter(c => c !== e.target.value))
    }
    useEffect(() => {

        dispatch(searchProducts(keyword, min, max, cat))
    }, [keyword, min, max, cat, dispatch])
    return (
        <div className="form-check">
            {values.map(category => (
                <p key={category} className="form-check-label" htmlFor="defaultCheck1">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={category}
                        id="defaultCheck1"
                        onClick={handleOnClick}
                    />
                    {category}
                </p>
            ))}
        </div>
    )
}

export default Categories
