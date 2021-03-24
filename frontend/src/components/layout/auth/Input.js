import React from 'react'

const Input = ({ label, error, value, onChange, name }) => {
    return (
        <div className="form-group">
            <label htmlFor="username">{label}</label>
            <input
                className={`form-control ${error ? "is-invalid" : ""}`}
                type={name}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error &&
                <div className="invalid-feedback">
                    {error}
                </div>}
        </div>
    )
}

export default Input
