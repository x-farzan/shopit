import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
    return (
        <div className="row" style={{ marginTop: "-1rem" }}>
            <div className="col-5 col-md-3 bg-dark">
                <Sidebar />
            </div>
            <div className="col-7 col-md-7">

            </div>
        </div>
    )
}

export default Dashboard
