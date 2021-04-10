import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Error from "../products/Error"
import {
    gettingAllUsersRequest,
    deletingUserRequest,
    resetGetAllUsers,
    resetDeleteUser,
} from "../../../store/admin/users/users"
import { MDBDataTable } from "mdbreact"
import { Link } from "react-router-dom"
import Sidebar from './Sidebar'
import Metadata from '../products/Metadata'

const Users = () => {
    const [msg, setMsg] = useState("")
    const dispatch = useDispatch()
    const { users, gAULoading, gAUError, dULoading, dUError, isDeleted, dUMsg } = useSelector(state => state.newAdmin.users)

    useEffect(() => {
        if (gAUError) {
            setMsg(gAUError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetGetAllUsers())
            }, 2000);
        }
        if (dUError) {
            setMsg(dUError)
            setTimeout(() => {
                setMsg("")
                dispatch(resetDeleteUser())
            }, 2000);
        }

        if (isDeleted || dUMsg) {
            setMsg(dUMsg)
            setTimeout(() => {
                setMsg("")
                dispatch(resetDeleteUser())
            }, 2000);
        }

        return () => {
            dispatch(resetDeleteUser())
            dispatch(resetGetAllUsers())
        }
    }, [dispatch, isDeleted, gAUError, dUError, dUMsg])

    useEffect(() => {
        dispatch(gettingAllUsersRequest())
        // eslint-disable-next-line
    }, [])
    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: "User ID",
                    field: "userId",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "Email",
                    field: "email", // this is used to connect the row and columns properly
                    sort: "asc"
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions"
                },
            ],
            rows: []
        }
        users && users.forEach(user => {
            data.rows.push({
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                    <>

                        <Link to={`/admin/user/${user._id}`} className="py-1 my-1 btn btn-primary d-block" >
                            <i className="fas fa-eye"></i>
                        </Link>
                        <button
                            onClick={() => deletingUser(user._id)}
                            to="#"
                            type="button"
                            disabled={dULoading ? true : false}
                            className="py-1 my-1 btn btn-danger btn-block" >
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        });
        return data
    }
    const deletingUser = (id) => {
        dispatch(deletingUserRequest(id))
    }
    return (
        <>
            <Metadata title="Users" />
            <div className="row minHeight">
                <div className="col-12 col-md-3 bg-dark" style={{ marginTop: "-1rem" }}>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-7">
                    {msg && <div className="alert alert-info">{msg}</div>}
                    <div >
                        <h1 className="my-5">All Users</h1>
                        {gAULoading ? (<Error />) : (
                            <>

                                <MDBDataTable
                                    data={setUsers()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users
