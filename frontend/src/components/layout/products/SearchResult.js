import React from 'react'
import Price from './Price'
import Result from './Result'
const SearchResult = ({ match }) => {
    return (
        <div className="container minHeight">
            <div className="row">

                <Price keyword={match.params.keyword} />

                <Result />
            </div>
        </div>
    )
}

export default SearchResult
