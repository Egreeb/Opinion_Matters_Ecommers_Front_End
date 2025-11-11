import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import { Bounce, toast } from 'react-toastify'

const ClientLogin = () => {
const navigate = useNavigate()
  const {loginfunc} = useContext(AppContext)
  const[formData, setformData] = useState({
    email:"",
    password: ""
  })
console.log(formData)
const handleSubmit = async(e)=>{
  e.preventDefault()
  const {email, password} = formData
  const result = await loginfunc(email,password)
  if(result.success){
    navigate('/')
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
const handleInput = (e)=>{
  const {name, value} = e.target
  setformData({...formData, [name]:value})
}

  return (
    <>
        <div className='container'>
            <div className="card userCard pb-3">
                <div className="card-body">
                    <div className='text-center mb-4'>
                        <h4 className="card-title text">Welcome To Ecommerce</h4>
                        <small>Log in with email & password</small>
                    </div>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email address:-</label>
                            <input type="email" className="form-control" id="email" name='email' value={formData.email} onChange={handleInput} />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:-</label>
                            <input type="password" className="form-control" id="password" name='password' value={formData.password} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    By signing up, you agree to <a href="">Terms & Condition</a>
                                </label>
                            </div>
                        </div><br />
                        <button className='btn btn-danger btn-block'> Login </button>
                    </form>
                </div>
                <div className='text-center  '>
                    <span fontSize="14px" color="text.muted">Don’t have account? </span>
                    <Link to={'/clientregister'}>Sign Up</Link>
                </div>
            </div><br />
        </div>
    </>
  )
}

export default ClientLogin
