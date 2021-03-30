import React, { useState, useEffect } from 'react'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'
import Input from './Input'
import { loginRequest } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Auth = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { isAuthenticated, error } = useSelector(state => state.auth.login)
    const initialState = {
        account: {
            email: '',
            password: ''
        },
        errors: {
            email: '',
            password: ''
        }
    }
    const [data, setData] = useState(initialState)
    const [loginError, setLoginError] = useState(null)
    useEffect(() => {
        if (isAuthenticated) {
            history.push("/")
        } else if (!isAuthenticated) {
            setLoginError(error)
            setTimeout(() => {
                setLoginError('')
            }, 2000)
        }
        return () => {
            window.location.reload()
        }
        //eslint-disable-next-line
    }, [isAuthenticated, error])


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };
        dispatch(loginRequest(data.account))
        if (!isAuthenticated) {
            setLoginError(error)
        }
        if (isAuthenticated) {
            history.push('/')
        }
        await setTimeout(() => {
            setLoginError(null)
        }, 2000)
    }

    const handleOnChange = (e) => {
        const newData = { ...data }
        newData.account[e.currentTarget.name] = e.currentTarget.value
        setData(newData)
    }
    const validation = () => {
        const schema = Joi.object({
            email: Joi.string().min(5).required().email({ tlds: { allow: false } }),
            password: new PasswordComplexity({
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
        <div className="container" style={{ width: '100vw', height: "100vh" }}>
            <div className="d-flex align-item-center justify-content-center">
                <div className="card w-50">
                    <div className="card-header h2 text-dark">
                        Login
                    </div>
                    {loginError &&
                        <small className="alert alert-danger text-center">
                            {loginError}
                        </small>}
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>
                            <Input
                                label="Email"
                                error={data.errors.email}
                                value={data.account.email}
                                onChange={handleOnChange}
                                name="email"
                            />
                            <Input
                                label="Password"
                                error={data.errors.password}
                                value={data.account.password}
                                onChange={handleOnChange}
                                name="password"
                            />
                            <Link to='/forgot/password' style={{ float: "right", cursor: "pointer" }}>Forgot Password?</Link>
                            <input type="submit" value="Login" className="btn btn-warning  btn-lg btn-block" />
                            <Link to='/register' className="my-2" style={{ float: "right", cursor: "pointer" }}>New User?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
