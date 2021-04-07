import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Error from "../products/Error"
import { gettingSingleUserRequest, clearingAdminErrors, updatingUserRequest } from "../../../store/admin"
import Input from '../auth/Input';
import { useHistory } from "react-router-dom"
import Joi from 'joi';
const UserDetail = ({ match }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user, loading, isUserUpdated } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(gettingSingleUserRequest(match.params.id))
        return () => {
            dispatch(clearingAdminErrors())
        }
    }, [dispatch, match])
    useEffect(() => {
        const newData = { ...data }
        if (user && user.name) {

            newData.account.name = user.name

            setData(newData)
        }
        if (isUserUpdated) {
            history.push('/admin/users')
        }
        // eslint-disable-next-line
    }, [dispatch, user, isUserUpdated])
    const initialState = {
        account: {
            name: '',

            role: '',
        },
        errors: {
            name: '',

            role: '',
        }
    }
    const [data, setData] = useState(initialState)
    const onChange = (e) => {
        const newData = { ...data }
        const errors = validation()
        newData.errors = errors || {}
        newData.account[e.currentTarget.name] = e.currentTarget.value
        setData(newData)
    }
    const role = [
        "user",
        "admin"
    ]

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const errors = validation()
        const newData = { ...data }
        newData.errors = errors || {}
        setData(newData)
        if (errors) { return null };

        const formData = new FormData()
        const { name, role } = data.account
        formData.set('name', name)
        formData.set('role', role)

        dispatch(updatingUserRequest(formData, match.params.id))
    }
    const validation = () => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            role: Joi.string().required().valid('user', 'admin')

        })
        const { error } = schema.validate(data.account)
        if (!error) return null
        const errors = {}
        for (let item of error.details) errors[item.path[0]] = item.message
        return errors
    }



    return (
        <div className="container" style={{ minHeight: "100vh" }}>
            <div className="d-flex align-items-center justify-content-center">
                {user && (user.name && !loading) ? (
                    <div className="card w-50">
                        <div className="card-header h2 text-dark">
                            Update a User
                    </div>
                        <div className="card-body">
                            <form onSubmit={handleOnSubmit}>
                                <Input
                                    label="Name"
                                    error={data.errors.name}
                                    value={data.account.name}
                                    onChange={onChange}
                                    name="name"
                                    type="text"
                                />
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        id="role"
                                        name="role"
                                        className={`form-control ${data.errors.role ? "is-invalid" : ""}`}
                                        onChange={onChange}
                                        value={data.account.role}
                                    >
                                        {role.map(role => (
                                            <option
                                                key={role}
                                                value={role}
                                            >{role}</option>
                                        ))}

                                    </select>
                                    {data.errors.role &&
                                        <div className="invalid-feedback">
                                            {data.errors.role}
                                        </div>}
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
                ) : (<Error />)}
            </div>
        </div >
    )
}

export default UserDetail
