import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'

const Home = () => {

  const {userProf} = useContext(AppContext)
  return (
    <div className="container mt-5">
        <div className="card">
            <div className="card-header">
                <h3>Welcome Mr. {userProf.first_name + " " + " " + userProf.last_name}</h3>
            </div>
            <div className="card-body">
                dsaf
            </div>
        </div>
    </div>
  )
}

export default Home