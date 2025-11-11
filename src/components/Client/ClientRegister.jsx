import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import { Bounce, toast } from 'react-toastify'

const ClientRegister = () => {    
    const navigate = useNavigate()
const {registertheUser} = useContext(AppContext)
  const [formData, setformData] = useState({
    first_name : "",
    last_name : "",
    emailId : "",
    phone_num : "",
    Password : ""
  })

  console.log(formData)
const handleSubmit = async(e) =>{
  
  const {first_name,last_name,emailId,phone_num,Password} = formData
  e.preventDefault()
  const result = await registertheUser(first_name,last_name,emailId,phone_num,Password);
  console.log(result)
  if(result.success){
    navigate('/clientlogin')
  }else{
    toast.error(result.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
}
  const handleInput = (e) =>{
    const {name, value} = e.target
    setformData({...formData, [name]:value})
  }

  return (
    <>
    <div className='container'>
        <div className="card ClientuserCard pb-3">
            <div className="card-body">
                <div className='text-center mb-4'>
                    <h4 className="card-title text">Create Your account</h4>
                    <small>Please fill all forms to continued</small>
                </div>
                <form  onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">First Name:</label>
                                <input type="name" className="form-control" id="first_name" name='first_name' value={formData.first_name} onChange={handleInput} required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="name">Last Name:</label>
                                <input type="name" className="form-control" id="last_name" name='last_name' value={formData.last_name} onChange={handleInput} required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" id="emailId" name='emailId' value={formData.emailId} onChange={handleInput} required/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="number" className="form-control" id="phone_num" name='phone_num' value={formData.phone_num} onChange={handleInput} required/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="password">Password:-</label>
                                <input type="password" className="form-control" id="Password" name='Password' value={formData.Password} onChange={handleInput} required/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        By signing up, you agree to <a href="">Terms & Condition</a>
                                    </label>
                                </div>
                            </div><br />
                            <button className='btn btn-danger btn-block'> Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div><br />
        <div className='text-center mb-5 '>
            <span fontSize="14px" color="text.muted">Already have account? </span>
            <Link to={'/clientlogin'}>Log in</Link>
        </div>
    </div>
    </>
  )
}

export default ClientRegister
