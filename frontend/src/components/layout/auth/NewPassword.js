import React, { useState, useEffect } from 'react'
import Joi from 'joi'
import Input from './Input'
import { new_PasswordRequest, resetNewPassword } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../products/Metadata'
import { useHistory } from "react-router-dom"
import PasswordComplexity from 'joi-password-complexity'

const NewPassword = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showPass, setShowPass] = useState(false)

    const { isAuthenticated, nPassLoading, nPassError, isPasUpdated } = useSelector(state => state.auth.login)

    const [msg, setMsg] = useState("")

    const initialState = {
        account: {
            password: '',
            confirmPassword: ''
        },
        errors: {
            password: '',
            confirmPassword: ''
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
        if (data.account.password !== data.account.confirmPassword) {
            setMsg("New and Confirm Passwords Should be same")
            setTimeout(() => {
                setMsg("")
                dispatch(resetNewPassword())
            }, 2000)
            return null
        }
        dispatch(new_PasswordRequest(match.params.token, data.account))
    }

    useEffect(() => {

        return () => {
            dispatch(resetNewPassword())
            setMsg("")
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (nPassError) {
            setMsg(nPassError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetNewPassword())
            }, 2000)
        }
        if (isPasUpdated) {
            setMsg("Password is Updated Successfully")
            setTimeout(() => {
                setMsg("")
                dispatch(resetNewPassword())
            }, 2000)
        }
        if (isAuthenticated) {
            setMsg("Password is Updated Successfully")
            setTimeout(() => {
                setMsg("")
                dispatch(resetNewPassword())
                history.push("/")
            }, 2000)
        }

    }, [dispatch, nPassError, isPasUpdated, isAuthenticated, history])


    const validation = () => {
        const schema = Joi.object({
            password: new PasswordComplexity({
                min: 8,
                max: 50,
                lowerCase: 1,
                upperCase: 1,
                numeric: 1,
                symbol: 1
            }).required(),
            confirmPassword: new PasswordComplexity({
                min: 8,
                max: 50,
                lowerCase: 1,
                upperCase: 1,
                numeric: 1,
                symbol: 1
            }).required()

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
                                label="New Password"
                                error={data.errors.password}
                                value={data.account.password}
                                onChange={handleOnChange}
                                name="password"
                                type={showPass ? "text" : "password"}
                            />
                            <Input
                                label="Confirm Password"
                                error={data.errors.confirmPassword}
                                value={data.account.confirmPassword}
                                onChange={handleOnChange}
                                name="confirmPassword"
                                type={showPass ? "text" : "password"}
                            />
                            <div>
                                <div className="form-check">
                                    <input
                                        value={showPass}
                                        onChange={() => setShowPass(!showPass)}
                                        checked={showPass}
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-warning  btn-lg btn-block"
                                disabled={nPassLoading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPassword
