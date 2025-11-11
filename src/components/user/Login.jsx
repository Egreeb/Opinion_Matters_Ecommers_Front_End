import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../Context/AppContext'
import logo from '../../assets/logo2.png'
import './Style.css'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
  const navigate = useNavigate();
  const {token, loginUser} = useContext(AppContext)
  const [formData, setFormdata] = useState({
    emailId:"",
    Password:""
  })
  
// Auto-redirect if user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true }); // ✅ replace prevents back button showing login
    }
  }, [token, navigate]);

const handleSumbit = (e)=>{
  e.preventDefault()
  const {emailId, Password} = formData
  loginUser(emailId,Password)
}

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormdata({...formData, [name]:value})
  }

  return (
    <>
    <div className="background">
      <div className='container'>
          <div className='card login_form'>
            <div className="card-header text-center">
              <img src={logo} alt="" />
            </div>
            <div className="card-body">
              <h2 className='text-center mb-4'>Login Panel</h2>
              <form action="" onSubmit={handleSumbit}>
                <div className='form-group mb-4'>
                  <input type="text" name="emailId" value={formData.emailId} placeholder='Email Address' onChange={handleChange}/>
                </div>
                <div className='form-group'>
                  <input type="password" name="Password" value={formData.Password} placeholder='Password' onChange={handleChange} />
                </div>
                <button className='btn btn-success btn-block mt-4'>Login</button>
              </form>
              <div className='forgot text-center mt-3'>
                <a href="#" style={{color:"#ffff"}}>Forgot Password ?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}
