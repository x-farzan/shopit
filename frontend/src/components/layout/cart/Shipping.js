import React, { useEffect, useState } from 'react'
import Input from '../auth/Input'
import { countryList } from './CountriesOptions'
import Joi from 'joi'
import { getShippingInfo } from '../../../store/user/cart'
import { useDispatch, useSelector } from 'react-redux'
import ShippingSteps from './ShippingSteps'
import { Link, useHistory } from 'react-router-dom'
const Shipping = () => {
    const history = useHistory();
    const shippingInfo = useSelector(state => state.entities.cart.shippingInfo)

    const dispatch = useDispatch()
    const initialState = {
        user: {
            address: "" || shippingInfo.address,
            city: "" || shippingInfo.city,
            phone: "" || shippingInfo.phone,
            postalCode: "" || shippingInfo.postalCode,
            country: "" || shippingInfo.country
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


    useEffect(() => {
        setData(initialState)
        //eslint-disable-next-line
    }, [shippingInfo])
    const handleOnChange = (e) => {
        const newData = { ...data }
        newData.user[e.target.name] = e.target.value
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
        dispatch(getShippingInfo(data.user))
        history.push('/confirm/order')

    }

    const validation = () => {
        const schema = Joi.object({
            address: Joi.string().min(5).max(255).required(),
            city: Joi.string().min(3).max(50).required(),
            phone: Joi.string().min(8).max(20).required(),
            postalCode: Joi.string().min(3).max(20).required(),
            country: Joi.string().min(3).max(50).required()
        })
        const { error } = schema.validate(data.user)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors
    }

    return (
        <div className="container" style={{ minHeight: "100vh" }}>
            <ShippingSteps
                shipping
            />
            <div className="card w-50 mx-auto mt-3">
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
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                name="country"
                                className={`form-control ${data.errors.country ? "is-invalid" : ""}`}
                                onChange={handleOnChange}
                                value={data.user.country}
                                type="text"
                            >
                                {countryList.map(country => (
                                    <option
                                        key={country}
                                        value={country}
                                    >{country}</option>
                                ))}

                            </select>
                            {data.errors.country &&
                                <div className="invalid-feedback">
                                    {data.errors.country}
                                </div>}
                        </div>
                        <div className="form-group">
                            <Link to="/confirm/order"
                                placeholder="Select Country"
                                type="submit"
                                onClick={handleOnSubmit}
                                className="btn btn-lg btn-warning btn-block">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Shipping
