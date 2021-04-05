import React from 'react'
import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ isAdmin, component: Component, render, ...rest }) => {

    const { res, isAuthenticated, loading } = useSelector(state => state.auth.login)
    return (
        <>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false || res === null) {
                            return <Redirect to={{
                                pathname: "/auth",
                                state: { from: props.location }
                            }} />
                        }
                        if (res.role !== 'admin' && isAdmin === true) {
                            return <Redirect to='/' />
                        }
                        return <Component {...props} />
                    }}
                />)}
        </>
    )
}

export default ProtectedRoute
