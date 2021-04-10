import React, { useState, useEffect } from 'react'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'
import Input from './Input'
import { changingPasswordRequest, resetChangePassword } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Metadata from '../products/Metadata'

const ChangePassword = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isAuthenticated, cPassLoading, cPassError, isChangedPass } = useSelector(state => state.auth.login)
    const [showPass, setShowPass] = useState(false)

    const [msg, setMsg] = useState("")

    const initialState = {
        account: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ""
        },
        errors: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ""
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
        if (data.account.newPassword !== data.account.confirmPassword) {
            setMsg("New and Confirm Passwords Should be same")
            setTimeout(() => {
                setMsg("")
                dispatch(resetChangePassword())
            }, 2000)
            return null
        }
        dispatch(changingPasswordRequest(data.account))

    }

    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/auth")
        }
        return () => {
            dispatch(resetChangePassword())
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (cPassError) {
            setMsg(cPassError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetChangePassword())
            }, 2000)
        }
        if (isChangedPass) {
            setMsg("Password is changed Successfully")
            setTimeout(() => {
                setMsg("")
                dispatch(resetChangePassword())
                history.push('/me')
            }, 2000)
        }

    }, [dispatch, cPassError, isChangedPass])

    const validation = () => {
        const schema = Joi.object({
            oldPassword: new PasswordComplexity({
                min: 8,
                max: 50,
                lowerCase: 1,
                upperCase: 1,
                numeric: 1,
                symbol: 1
            }).required(),
            newPassword: new PasswordComplexity({
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
            <Metadata title="Change Password" />

            {msg && <div className="alert text-center alert-info">{msg}</div>}
            <div className="d-flex align-item-center justify-content-center">
                <div className="card w-50">
                    <div className="card-header h2 text-dark">
                        Change Password
                </div>

                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>

                            <Input
                                label="Old Password"
                                error={data.errors.oldPassword}
                                value={data.account.oldPassword}
                                onChange={handleOnChange}
                                name="oldPassword"
                                type={showPass ? "text" : "password"}
                            />

                            <Input
                                label="New Password"
                                error={data.errors.newPassword}
                                value={data.account.newPassword}
                                onChange={handleOnChange}
                                name="newPassword"
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
                                disabled={cPassLoading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
