import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const AppState = (props) => {
// THIS IS ADMIN USESTATE
const [token, setToken] = useState(localStorage.getItem("token") || "")
const [relode, setRelode] = useState(false)
const [userProf, setUserProf] = useState({})
const [alluserProf, setallUserProf] = useState()
// THIS IS FRONT WEBSITE USESTATE
const [Clienttoken, setClientToken] = useState(localStorage.getItem("ClientToken") || "")
const [getProduct, setProducts ] = useState([])
const [userCart, setUserCart] = useState({})
const [userAddress, setUseradd] = useState()
const [ClientProf, setClientProf] = useState({})
const [userOrder, SetUserorder] = useState([])
const [isauthenticated, setauthenticated] = useState(false)


const navigate = useNavigate()
// console.log(token)

// THIS USEEFFECT TOKEN FOR ADMIN SIDE
useEffect(()=>{
  if(token){
    getUserProf()
    getAllUserPro()
  }

  
},[token,relode])

// THIS USEEFFECT TOEKN FOR CLEINT SIDE
useEffect(()=>{

  if(Clienttoken){
    getUserCart()
    getClientProf()
    getUserOrder()
    getAddress()
    setauthenticated(true)
  }

  
},[Clienttoken,relode])

useEffect(()=>{
let istoken = localStorage.getItem('token')
if(istoken){
  setToken(istoken)
}

},[])

useEffect(()=>{
let istoken = localStorage.getItem('ClientToken')
if(istoken){
  setClientToken(istoken)
}

},[])



// const url = "http://localhost:8000/api"
const url ="https://opinion-matters-ecommers.onrender.com/api"
// LOGIN API CALL 
const loginUser = async(emailId, Password)=>{

  const api = await axios.post(`${url}/user/login`,
    {emailId,Password},
    {
    headers:{
      "Content-Type":"application/json"
    },
    withCredentials:true
  },)
  
  if(api.data.success){
    toast.success(api.data.message, {
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
    localStorage.setItem('token', api.data.token)
    setToken(api.data.token)
    navigate('/dashboard')
  }
  console.log(api.data)

}

// LOGOUT FUNCTION
const logOut = async()=>{
  toast.error("Logout Succesfully", {
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
  setToken("")  
  localStorage.removeItem('token')
  setRelode(!relode)
}

// USERPROFILE
const getUserProf = async()=>{
  const api = await axios.get(`${url}/user/getloginuser`, {
    headers:{
      "Content-Type":"application/json",
      "Auth" : token
    },
    withCredentials:true
  })
  setUserProf(api.data.user)
}


// GET ALL USER FOR ADMIN
const getAllUserPro = async()=>{
  const api = await axios.get(`${url}/user/getall`, {
    headers:{
      "Content-Type":"application/json",
      "Auth" : token
    },
    withCredentials:true
  })
  setallUserProf(api.data.user)
  // return (api.data.user)
}

// ADD USER 
const addUser = async(first_name,last_name,email,phone,user_role,password)=>{
    const api = await axios.post(`${url}/user/register`, 
    {
      first_name,
      last_name,
      emailId:email,
      phone_num:phone,
      user_role,
      Password:password
    }, 
    {
    headers:{
      "Content-Type":"application/json",
    },
    withCredentials:true
  })
  
  if(api.data.success){
  setRelode(!relode)
  }
    return api.data
}

// DELETE USER BY ID
const deleteSpecUser = async(user_id)=>{
  const confirmed = window.confirm("Are you sure you want to delete this user?");
  if (!confirmed) return; 
  const api = await axios.delete(`${url}/user/delete/${user_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Auth":token
      },
      withCredentials: true
    })

    if(api.data.success){
      alert("User Deleted Successfully!");
      getAllUserPro()
    }else{
      alert("Something went wrong")
    }
    console.log(api.data)
}

// FRONT ECOMMERCE CODE API FETCH START FROM HERE
  useEffect(()=>{
    const fetchProduct = async()=>{
      const api = await axios.get(`${url}/product/getall`, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      setProducts(api.data.product)
    }
    fetchProduct()
  },[relode])

// ADD PRODUCT 
const addProduct = async(product_title,product_category,product_desc,product_qty,product_price,productImage)=>{
  const api = await axios.post(`${url}/product/add`, 
    {
    title:product_title,
    desc:product_desc,
    price:product_price,
    category:product_category,
    imgUrl:productImage,
    productQty:product_qty
    },
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    }
  )
  if(api.data.success){
  setRelode(!relode)
  }
    return api.data
}

// DELETE PRODUCT 
const deleteSpecPrdocut = async(product_id)=>{
  const confirmed = window.confirm("Are you sure you want to delete this Product?");
  if (!confirmed) return; 
  const api = await axios.delete(`${url}/product/delete/${product_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })

    if(api.data.success){
      alert("User Deleted Successfully!");
       setRelode(!relode)
    }else{
      alert("Something went wrong")
    }
    console.log(api.data)
}

// UPDATE PRODUCT 
const UpdateProduct = async(product_id, updatedData)=>{
  const api = await axios.put(`${url}/product/update/${product_id}`, 
    updatedData,
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    }
  )
  if(api.data.success){
    setRelode(!relode)
  }
    return api.data
}

// GET PRODUCT BY ID
const GetProductById = async(product_id)=>{
  const api = await axios.get(`${url}/product/get/${product_id}`, 
    {
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    }
  )
  if(api.data.success){
    // setRelode(!relode)
  }
  // console.log(api.data)
    return api.data
    
}
// ADD TO CART 
const AddtoCart = async(productId, title,price,imgUrl,productQty)=>{
  const api = await axios.post(`${url}/cart/add`, 
    {productId, title,price,imgUrl,productQty},
    {
    headers:{
      "Content-Type":"application/json",
      "Auth":Clienttoken
    },
    withCredentials:true
  })
  if(api.data.success){
      toast.success(api.data.message, {
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
  setRelode(!relode)
  
}

const getUserCart = async()=>{
    const api = await axios.get(`${url}/cart/get`, 
    {
    headers:{
      "Content-Type":"application/json",
      "Auth":Clienttoken
    },
    withCredentials:true
  })
  setUserCart(api.data.cart)
}

const removeFromCart = async(productId)=>{
  const api = await axios.delete(`${url}/cart/remove/${productId}`, 
    {
    headers:{
      "Content-Type":"application/json",
      "Auth":Clienttoken
    },
    withCredentials:true
  })
  if(api.data.success){
      toast.success(api.data.message, {
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
  setRelode(!relode)
  
}

const decreseQty = async(productId,productQty)=>{
  const api = await axios.post(`${url}/cart/--qty`, 
    {productId,productQty},
    {
    headers:{
      "Content-Type":"application/json",
      "Auth":Clienttoken
    },
    withCredentials:true
  })
  if(api.data.success){
      toast.info(api.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }
  setRelode(!relode)
  
}
// CLEAR FULL CART 
const clearCart = async()=>{
  const api = await axios.delete(`${url}/cart/clear`, 
    {
      headers:{
        "Content-Type": "application/json",
        "Auth" : Clienttoken
      },
      withCredentials:true
    }
  )
  setRelode(!relode)
  console.log(api.data)
}

// CLIENT REGISTRATION
const registertheUser = async(first_name,last_name,emailId,phone_num,Password)=>{

  const api = await axios.post(`${url}/user/registerclient`,
    {first_name,last_name,emailId,phone_num,Password},
    {
    headers:{
      "Content-Type":"application/json"
    },
    withCredentials:true
  },)
  if(api.data.success){
    toast.success(api.data.message, {
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
  return api.data
}


// CLIENT LOGIN
const loginfunc = async(emailId, Password)=>{

  const api = await axios.post(`${url}/user/clientlogin`,
    {emailId,Password},
    {
    headers:{
      "Content-Type":"application/json"
    },
    withCredentials:true
  },)
  
  if(api.data.success){
    toast.success(api.data.message, {
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
    localStorage.setItem('ClientToken', api.data.token)
    setClientToken(api.data.token)
    setauthenticated(true)
    navigate('/')
  }
  return api.data
}
// LOGOUT CLIENT
const LogoutClient = async() =>{
  setauthenticated(false)
  setToken("")
  localStorage.removeItem('ClientToken')
        toast.error('Logout Succesfully !', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
})
window.location.reload()
}

const getClientProf = async()=>{
  const api = await axios.get(`${url}/user/getclientuser`, {
    headers:{
      "Content-Type":"application/json",
      "Auth" : Clienttoken
    },
    withCredentials:true
  })
  setClientProf(api.data.user)
}


// ADD ADDRESS 

const addAdress = async(userId,fullname,address,city,state,country,pincode, phoneNumber)=>{
  
  const api = await axios.post(`${url}/address/add`, 
  {userId,fullname,address,city,state,country,pincode, phoneNumber},
    {
      headers:{
      "Content-Type": "application/json",
      "Auth": Clienttoken,
    },
    withCredentials:true
  },
)
if(api.data.success){
      toast.success(api.data.message, {
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
return api.data
}

// get Address API
const getAddress = async()=>{
  const api = await axios.get(`${url}/address/get`,
    {
      headers:{
      "Content-Type": "application/json",
      "Auth": Clienttoken,
    },
    withCredentials:true
  },
  )
  setUseradd(api.data.getAdd)
}


// GET USER ORDER 

const getUserOrder = async()=>{
  const api = await axios.get(`${url}/payment/userorder`,
    {
      headers:{
      "Content-Type": "application/json",
      "Auth": Clienttoken,
    },
    withCredentials:true
  },
  )
  SetUserorder(api.data.orders)
}


  return (
    <AppContext.Provider value={{
        loginUser,
        logOut,
        token,
        userProf,
        alluserProf,
        addUser,
        deleteSpecUser,
        getProduct,
        addProduct,
        deleteSpecPrdocut,
        UpdateProduct,
        GetProductById,
        AddtoCart,
        loginfunc,
        Clienttoken,
        userCart,
        removeFromCart,
        decreseQty,
        getAddress,
        addAdress,
        userAddress,
        url,
        ClientProf,
        clearCart,
        userOrder,
        LogoutClient,
        isauthenticated,
        registertheUser
    }}>
    {props.children}
    </AppContext.Provider>
  )
}

export default AppState