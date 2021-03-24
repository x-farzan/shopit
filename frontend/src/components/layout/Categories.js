import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { searchByCategory } from '../../store/products'

const Categories = ({ keyword, min, max, reset }) => {
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
        // console.log(cat)
    }
    const loaded = useRef(false);
    useEffect(() => {
        if (loaded.current) {
            dispatch(searchByCategory(keyword, min, max, cat))
        } else {
            loaded.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cat]);
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
