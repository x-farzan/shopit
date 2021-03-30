import React from 'react'
import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {

    const { res, isAuthenticated, loading } = useSelector(state => state.auth.login)
    return (
        <>
            {!loading && <Route
                {...rest}
                render={props => {
                    if (isAuthenticated === false || res === null) {
                        return <Redirect to={{
                            pathname: "/auth",
                            state: { from: props.location }
                        }} />
                    }
                    return <Component {...props} />
                }}
            />}
        </>
    )
}

export default ProtectedRoute
