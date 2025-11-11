import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'
import { toast, Bounce } from 'react-toastify'

const User = () => {
    const {addUser} = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email:"",
        phone:"",
        user_role:"",
        password:""

    })
    // console.log(formData)
    
    const [loader, setloader] = useState(false)
    const handleChange = (e)=>{
        const {value,name} = e.target
        setFormData({...formData, [name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setloader(true)
        const {first_name,last_name,email,phone,user_role,password} = formData
        const res = await addUser(first_name,last_name,email,phone,user_role,password)
        if(res.success){
            setTimeout(()=>{
                toast.success(res.message, {
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
                setFormData("")
                navigate('../view')
            },2000);
        }else{
            setloader(false)
            toast.error(res.message, {
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

  return (
    <>
    <div className="container users mt-5">
        
        <div className="card">
            <div className="card-header">
                <h3>User Registration</h3>
                <Link to={'../view'}><button className='btn btn-info'>View Users</button></Link>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="">First Name</label>
                            <input type="text" value={formData.first_name} onChange={handleChange} name='first_name' className='form-control' placeholder='First Name...' required/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="">Last Name</label>
                            <input type="text" value={formData.last_name} onChange={handleChange} name='last_name' className='form-control' placeholder='Last Name...' required/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="">Email Id</label>
                            <input type="email" value={formData.email} onChange={handleChange} name='email' className='form-control' placeholder='demo@gmail.com' required/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="">Phone Number</label>
                            <input type="number" value={formData.phone} onChange={handleChange} name='phone' className='form-control' placeholder='+971' required/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="inputState">User Role</label>
                            <select id="inputState" value={formData.user_role} onChange={handleChange} name='user_role' className="form-control" required>
                                <option value="" disabled >Select Role...</option>
                                <option >Admin</option>
                                <option>Manager</option>
                                <option>Inventory Manager</option>
                                <option>Sales Staff</option>
                                <option>Customer Support</option>
                                <option>Marketing Admin</option>
                                <option>Content Editor</option>
                                <option>Accountant / Finance</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label htmlFor="">User Password</label>
                            <input type="password" value={formData.password} onChange={handleChange} name='password' className='form-control' placeholder='Password here..' required/>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <button className='btn btn-success btn-block'>
                            {loader ? 
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Please wait...
                            </> : "SUBMIT"}
                        </button>
                    </div>
                </div>
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default User