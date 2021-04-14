import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Input from './Input'
import Joi from 'joi'
import Error from '../products/Error'
import { updatingProfileRequest, clearError } from '../../../store/auth'
import { useHistory } from 'react-router-dom'
const UpdatingProfile = (props) => {
    const { res, loading, isAuthenticated, updateProfile, error } = useSelector(state => state.auth.login)
    const dispatch = useDispatch()
    const history = useHistory()
    const initialState = {
        user: {
            name: '',
            email: ''
        },
        errors: {
            name: '',
            email: ''
        }
    };

    const [data, setData] = useState(initialState)

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')
    const [fileName, setFileName] = useState('')
    const [imgError, setimgError] = useState("")
    // console.log(res)
    useEffect(() => {
        if (res) {
            const newData = { ...data }
            newData.user.name = res.name;
            newData.user.email = res.email;
            setData(newData)
            setAvatarPreview(res.avatar.url)
        }

        //eslint-disable-next-line
    }, [res])
    useEffect(() => {
        if (isAuthenticated && updateProfile) {
            const { state } = props.location
            history.push(state ? state.from.pathname : "/me")
        } else if (!isAuthenticated) {
            setimgError(error)
            setTimeout(() => {
                setimgError('')
            }, 2000)
        }
        //eslint-disable-next-line
    }, [isAuthenticated, res, updateProfile])
    useEffect(() => {
        if (error) {
            setimgError(error)
            setTimeout(() => {
                setimgError("")
            }, 2000)
        }
        //eslint-disable-next-line
    }, [error])

    useEffect(() => {

        return () => {
            setimgError('')
            dispatch(clearError())
        }
        //eslint-disable-next-line
    }, [])


    const handleOnSubmit = (e) => {
        console.log("clicked")
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };
        if (!avatar) {
            setimgError("Please Fill All Fields")
            setTimeout(() => {
                setimgError("")
            }, 2000)
            return;
        }
        const formData = new FormData()
        const { name, email } = data.user
        formData.set('name', name)
        formData.set('email', email)
        formData.set('avatar', avatar)

        dispatch(updatingProfileRequest(formData))
    }
    const validation = () => {
        console.log("ewertyuioiuytrewqwerty")
        const schema = Joi.object({
            email: Joi.string().min(5).required().email({ tlds: { allow: false } }),
            name: Joi.string().min(3).max(50).required(),
        })
        const { error } = schema.validate(data.user)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        console.log(errors)
        return errors
    }


    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0]
            if (file) {
                if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {
                    setFileName(file.name)
                    const reader = new FileReader()
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            setAvatar(reader.result)
                            setimgError("")
                            setAvatarPreview(reader.result)
                        }
                    }
                    reader.readAsDataURL(file)
                } else {
                    setimgError("Please Select the correct file extension")
                    setTimeout(() => {
                        setimgError("")
                    }, 2000)
                }
            }
        } else {
            const newData = { ...data }
            newData.user[e.currentTarget.name] = e.currentTarget.value
            setData(newData)
        }
    }

    return (
        <>
            {res !== null ? (
                <div className="container" style={{ height: "100vh" }}>
                    <div className="d-flex align-item-center justify-content-center">
                        <div className="card w-75">
                            <div className="card-header h2 text-dark">
                                Update Profile
                            </div>
                            {imgError &&
                                <small className="alert alert-danger text-center">
                                    {imgError}
                                </small>}
                            <div className="card-body">
                                <form onSubmit={handleOnSubmit}>
                                    <Input
                                        label="Name"
                                        error={data.errors.name}
                                        value={data.user.name}
                                        onChange={onChange}
                                        name="name"
                                    />
                                    <Input
                                        label="Email"
                                        error={data.errors.email}
                                        value={data.user.email}
                                        onChange={onChange}
                                        name="email"
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
                                                <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Update"
                                        className="btn btn-warning  btn-lg btn-block"
                                        onClick={handleOnSubmit}
                                        disabled={loading ? true : false}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </>
    )
}

export default UpdatingProfile
