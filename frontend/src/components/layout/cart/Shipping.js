import React, { useState } from 'react'
import Input from '../auth/Input'
import { countryList } from './CountriesOptions'
import Joi from 'joi'
const Shipping = () => {
    const initialState = {
        user: {
            address: "",
            city: "",
            phone: "",
            postalCode: "",
            country: ""
        },
        errors: {
            address: "",
            city: "",
            phone: "",
            postalCode: "",
            country: ""
        }
    }
    const [data, setData] = useState(initialState)

    const handleOnChange = (e) => {
        const newData = { ...data }
        newData.user[e.currentTarget.name] = e.currentTarget.value
        setData(newData)
        const errors = validation()
        const errorsData = { ...data }
        errorsData.errors = errors || {}
        setData(errorsData)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };
    }

    const validation = () => {
        const schema = Joi.object({
            address: Joi.string().min(5).required(),
            city: Joi.string().min(3).required(),
            phone: Joi.string().min(8).max(20).required(),
            postalCode: Joi.string().min(3).max(20).required(),
            country: Joi.string().min(3).max(20).required()
        })
        const { error } = schema.validate(data.user)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors
    }

    return (
        <div className="container" style={{ minHeight: "100vh", paddingTop: "5rem" }}>
            <div className="card w-50 mx-auto">
                <h1 className="card-header">
                    Shipping Info
                </h1>
                <div className="card-body">
                    <form onSubmit={handleOnSubmit}>
                        <Input
                            label="Address"
                            name="address"
                            error={data.errors.address}
                            value={data.user.address}
                            onChange={handleOnChange}
                            type="text"
                        />
                        <Input
                            label="City"
                            name="city"
                            error={data.errors.city}
                            value={data.user.city}
                            onChange={handleOnChange}
                            type="text"
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            error={data.errors.phone}
                            value={data.user.phone}
                            onChange={handleOnChange}
                            type="number"
                        />
                        <Input
                            label="Postal Code"
                            name="postalCode"
                            error={data.errors.postalCode}
                            value={data.user.postalCode}
                            onChange={handleOnChange}
                            type="number"
                        />
                        <div className="form-group">
                            <label htmlFor="gender">Country</label>
                            <select
                                id="gender"
                                name="country"
                                className="form-control"
                                onChange={handleOnChange}
                                type="text"
                            >
                                {countryList.map(country => (
                                    <option
                                        key={country}
                                        value={country}
                                    >{country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button
                                placeholder="Select Country"
                                type="submit"
                                className="btn btn-lg btn-warning btn-block">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Shipping
