import React, { useState, useEffect } from 'react'
import Joi from 'joi'
import Input from './Input'
import { forgot_PasswordRequest, resetForgotPassword } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../products/Metadata'
import { useHistory } from "react-router-dom"
const ForgotPassword = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { fPassLoading, fPassError, isURLSent, message } = useSelector(state => state.auth.login)

    const [msg, setMsg] = useState("")

    const initialState = {
        account: {
            email: ''
        },
        errors: {
            email: ''
        }
    }
    const [data, setData] = useState(initialState)

    const handleOnChange = (e) => {

        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        newData.account[e.currentTarget.name] = e.currentTarget.value
        setData(newData)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };

        dispatch(forgot_PasswordRequest(data.account))

    }

    useEffect(() => {

        return () => {
            dispatch(resetForgotPassword())
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (fPassError) {
            setMsg(fPassError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetForgotPassword())
            }, 2000)
        }
        if (isURLSent || message) {
            setMsg(message)
            setTimeout(() => {
                setMsg("")
                dispatch(resetForgotPassword())
                history.push("/auth")
            }, 10000)
        }

    }, [dispatch, fPassError, isURLSent, message, history])

    const validation = () => {
        const schema = Joi.object({
            email: Joi.string().min(5).required().email({ tlds: { allow: false } }),
        })
        const { error } = schema.validate(data.account)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors
    }
    return (
        <div className="container minHeight">
            <Metadata title="Forgot Password" />

            {msg && <div className="alert text-center alert-info">{msg}</div>}
            <div className="d-flex align-item-center justify-content-center">
                <div className="card w-75">
                    <div className="card-header h2 text-dark">
                        Forgot Password
                </div>

                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>

                            <Input
                                label="Enter Registered Email"
                                error={data.errors.email}
                                value={data.account.email}
                                onChange={handleOnChange}
                                name="email"
                                type="email"
                            />

                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-warning  btn-lg btn-block"
                                disabled={fPassLoading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
