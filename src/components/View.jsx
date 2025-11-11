import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../Context/AppContext'

const Viewjsx = () => {
const {alluserProf, deleteSpecUser} = useContext(AppContext)
console.log(alluserProf)
  return (
    <>
      <div className="container users mt-5">
        <div className="card">
          <div className="card-header">
            <h3>All Users</h3>
            <Link to={'../user'}><button className='btn btn-info'>+ Add Users</button></Link>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
                <thead className='thead-dark'>
                  <tr>
                    <th>Full Name</th>
                    <th>User Role</th>
                    <th>Email Id</th>
                    <th>Phone Number</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {alluserProf?.map((data)=>{
                    return(
                      <tr key={data._id}>
                        <td>{data.first_name} {data.last_name}</td>
                        <td>{data.user_role}</td>
                        <td>{data.emailId}</td>
                        <td>{data.phone_num}</td>
                        <td>
                          <button className='btn btn-info btn-sm'>Edit</button>
                        </td>
                        <td>
                          <button className='btn btn-danger btn-sm' onClick={()=>deleteSpecUser(data._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Viewjsx