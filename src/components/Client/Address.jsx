import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

const Address = () => {
    const {userProf,addAdress,getAddress} = useContext(AppContext)
    const navigate = useNavigate()
    const [formData, setfromData] = useState({
      userId: "",
      fullname: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber:""
  })

console.log(formData)
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const {userId,fullname,address,city,state,country,pincode,phoneNumber} = formData
    const result = await addAdress(userProf._id,fullname,address,city,state,country,pincode, phoneNumber)
    if(result.success){
      await getAddress()
     navigate('/checkout')
    }
    setfromData({
      userId: "",
      fullname: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber:""
    })
}
  const handlechangeform = (e)=>{
    const {name, value} = e.target
    setfromData({...formData, [name]:value})
  }
  return (
    <>
    <div className="container">
        <div className="card">
            <div className="card-header">Shipping Address</div>
            <div className="card-body">
                <form action="" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">Full Name:</label></small>
                                <input onChange={handlechangeform} value={formData.fullname} type="text" className="form-control" name='fullname' placeholder='Please type full name..' required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">Phone Number:</label></small>
                                <input onChange={handlechangeform} value={formData.phoneNumber} type="phoneNumber" className="form-control" name='phoneNumber' placeholder='Please type number' required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">Country:</label></small>
                                <select onChange={handlechangeform} value={formData.country} className="form-control" name='country'>
                                    <option value="" disabled>Select country</option>
                                    <option value="india">India</option>
                                    <option value="uae">UAE</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">City:</label></small>
                                <select onChange={handlechangeform} value={formData.city} className="form-control" name='city'>
                                    <option value="" disabled>Select City</option>
                                    <option value="nagpur">Nagpur</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">State:</label></small>
                                <select onChange={handlechangeform} value={formData.state} className="form-control" name='state'>
                                    <option value="" disabled>Select State</option>
                                    <option value="maharashtra">Maharashtra</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small><label htmlFor="">Pin Code:</label></small>
                                <input onChange={handlechangeform} value={formData.pincode} type="number" className="form-control" name='pincode' placeholder='Please Pin Code..' required />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Address:</label>
                                <textarea onChange={handlechangeform} value={formData.address} name='address' className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-success mr-2'>Submit</button>
                        <a className='btn btn-warning' onClick={() => navigate('/checkout')}>Use old Address</a>
                    </div>
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default Address