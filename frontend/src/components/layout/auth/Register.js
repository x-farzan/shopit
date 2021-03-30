import React, { useState, useEffect } from 'react'
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'
import Input from './Input'
import { registeringRequest, clearError } from '../../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [imgErr, setImgErr] = useState("")
    const [filename, setFilename] = useState("Choose Avatar")
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [avatar, setAvatar] = useState("");


    const { isAuthenticated, res, loading, error } = useSelector(state => state.auth.login)
    const initialState = {
        account: {
            name: '',
            email: '',
            password: '',
        },
        errors: {
            name: '',
            email: '',
            password: '',
        }
    }
    const [data, setData] = useState(initialState)
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        } else if (!isAuthenticated) {
            setImgErr(error)
            setTimeout(() => {
                setImgErr('')
                dispatch(clearError())

            }, 2000)
        }
        //eslint-disable-next-line
    }, [isAuthenticated, res, loading])


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };
        if (!avatar) {
            setImgErr("Please Fill All Fields")
            setTimeout(() => {
                setImgErr("")
            }, 2000)
            return;
        }

        const formData = new FormData()
        const { name, email, password } = data.account
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(registeringRequest(formData))

    }


    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0]
            if (file) {
                if (file.type.includes("jpeg" || "png" || "jpg")) {
                    setFilename(file.name)
                    const reader = new FileReader()
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setAvatar(reader.result)
                            setImgErr('')
                            setAvatarPreview(reader.result)
                        }
                    }
                    reader.readAsDataURL(file)
                } else {
                    setImgErr("Please Select the correct file extension")
                    setTimeout(() => {
                        setImgErr("")
                    }, 2000)
                }
            }

        } else {
            const newData = { ...data }
            newData.account[e.currentTarget.name] = e.currentTarget.value
            setData(newData)
        }
    }

    const validation = () => {
        const schema = Joi.object({
            email: Joi.string().min(5).required().email({ tlds: { allow: false } }),
            name: Joi.string().min(3).max(50).required(),
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
                        Register
                </div>
                    {imgErr &&
                        <small className="alert alert-danger text-center">
                            {imgErr}
                        </small>}
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>
                            <Input
                                label="Name"
                                error={data.errors.name}
                                value={data.account.name}
                                onChange={onChange}
                                name="name"
                            />
                            <Input
                                label="Email"
                                error={data.errors.email}
                                value={data.account.email}
                                onChange={onChange}
                                name="email"
                            />
                            <Input
                                label="Password"
                                error={data.errors.password}
                                value={data.account.password}
                                onChange={onChange}
                                name="password"
                            />
                            <div className="row my-3">
                                <div className="col-2">
                                    {avatarPreview ? (
                                        <img src={avatarPreview} alt=""
                                            style={{ width: "100%", height: "80%", borderRadius: "50%" }}
                                        />
                                    ) : (
                                        <i className="fa fa-2x fa-user"></i>
                                    )}
                                </div>
                                <div className="col-10">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="avatar"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Register"
                                className="btn btn-warning  btn-lg btn-block"
                                onClick={handleOnSubmit}
                                disabled={loading ? true : false}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
