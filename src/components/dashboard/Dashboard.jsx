import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import AppContext from '../../Context/AppContext'
import {jwtDecode} from 'jwt-decode'
import './Style.css'
const Dashboard = () => {
  const {logOut,token, userProf} = useContext(AppContext)
  const [isOpen, setIsopen] = useState(true);
  const navigate = useNavigate()
  console.log(token)

  useEffect(()=>{
    if(!token){
      navigate("/login")
      return
    }
    const decoded = jwtDecode(token)
    if(decoded.exp * 1000 < Date.now()){
        localStorage.removeItem("token");
         logOut()
        navigate("/login");
    }
  },[navigate,logOut,token])
  return (
    <>
    <div className='main_dashboard'>
      <div className='header'>
        <Link to={'admin'} className='btn btn-danger' onClick={()=> {logOut(), navigate('admin')}}>Logout</Link>
      </div>
      <div className="row">
        <div className={`${isOpen ? 'col-md-2' : 'col-md-1'}`}>          
          <div className={`side-bar ${isOpen ? 'open' : 'close'}`}>
            <div className="sidebar-header">
              <button className='togglebtn' onClick={()=>setIsopen(!isOpen)}>
                <div className={`arrow ${isOpen ? 'left': 'right'}`}></div>
              </button>
              <div className='logo'>
                <h2>{`${isOpen ? "Egreeb" : ""}`}</h2>
              </div>
            </div>
            {isOpen &&
            <div className='nav-menu'>
              <ul>
                <li>
                  <div className='lisym'>
                    <span className="material-symbols-outlined">
                      dashboard
                    </span>
                    <Link to={'/admin'}>Dashboard</Link>
                  </div>
                </li>
                  <li className='navbar-toggler' data-toggle="collapse" data-target="#1">
                    <div className='lisym'>
                      <span className="material-symbols-outlined">
                      storefront
                      </span>
                      <Link>Products</Link>
                    </div>
                  </li>
                  <div className='collapse' id="1"  >
                    <li>
                      <div className='lisym'>
                        <span className="material-symbols-outlined">
                        add
                        </span>
                        <Link to={'product'}>Add Products</Link>
                      </div>
                    </li>
                  </div>
                  {/* USER ONLY SHOWING TO ADMIN LOGIC */}
                  {(userProf?.user_role == "Admin") && 
                  <>
                    <li className='navbar-toggler' data-toggle="collapse" data-target="#2">
                      <div className='lisym'>
                        <span className="material-symbols-outlined">
                        contacts_product
                        </span>
                        <a href="#">Users</a>
                      </div>
                    </li>
                    <div className='collapse' id="2"  >
                      <li>
                        <div className='lisym'>
                          <span className="material-symbols-outlined">
                            add
                          </span>
                          <Link to={'user'}>Add User</Link>
                        </div>
                      </li>
                      <li>
                        <div className='lisym'>
                          <span className="material-symbols-outlined">
                          visibility
                          </span>
                          <Link to={'view'}>View Users</Link>
                        </div>
                      </li>
                    </div>                  
                  </>
                  }
              </ul>
            </div>
            }
          </div>
        </div>

        <div className={`${isOpen ? 'col-md-10' : 'col-md-11'}`}>
          <Outlet />
        </div>

      </div>
    </div>

    
    </>
  )
}

export default Dashboard