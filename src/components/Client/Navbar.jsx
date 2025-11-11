import React, { useContext, useState } from 'react'
import './Style.css'
import logo from '../../assets/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import AppContext from '../../Context/AppContext'

const Navbar = () => {
    const {LogoutClient,isauthenticated,userCart} = useContext(AppContext)
    const [searchprod, setSearchProduct] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate(`productdetail/search/${searchprod}`)
        setSearchProduct("")
    }

  return (
    <>
    
    <div className="header-front">
        <div className='container navhead'>
            <div className="top-left">
                <span><i className="fa fa-phone" aria-hidden="true"></i> +971 547241907</span>
                <span><i className='fa fa-envelope'></i> gajjudube4@gmail.com</span>
            </div>
            <div className="top-right">
                <div className='FAQ'>
                    <span>Theme FAQ</span>
                    <span>About</span>
                    <span>Languages</span>
                </div>
            </div>
        </div>
    </div>
    <div className='header2 pb-3 sticky-top'>
              {isauthenticated &&
                  <Link to={'/cart'}>
                      <button className='btn CustomBtn cart-btn-for-mobile' style={{ position: "relative" }}><i className='fa fa-shopping-cart'></i>
                          <div className='cart-icon-count'><small><b>{userCart?.items?.length}</b></small></div>
                      </button>
                  </Link>
              }
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to={"/"}><img src={logo} alt="" width={"200px"} /></Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <div className='input-group'>
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i className='fa fa-search'></i></span>
                                </div>
                                <input value={searchprod} onChange={(e)=>setSearchProduct(e.target.value)} type='text' className="search-field form-control" placeholder="Search Product Here...." required />
                            </div>
                        </form>
                    </div>
                    <div className='buttons'>
                        {isauthenticated &&
                        <Link to={'/orderconfirmation'}><button className='btn CustomBtn'><i className='fa fa-user-o'></i></button></Link>
                        }
                        {isauthenticated &&
                        <Link to={'/cart'}>
                            <button className='btn CustomBtn cart-btn' style={{ position: "relative" }}><i className='fa fa-shopping-cart'></i>
                                    <div className='cart-icon-count'><small><b>{userCart?.items?.length}</b></small></div>
                            </button>
                        </Link>
                        }
                        {isauthenticated ? 
                        <button className='btn LogoutBtn CustomBtn' onClick={()=>LogoutClient()}>
                            <i className='fa fa-sign-out'></i>
                        </button>
                        :
                        <Link className='Link' to={'/clientlogin'}><button className='btn btn-primary ml-2'>Login</button></Link>
                        }

                    </div>
                </div>
            </nav>
        </div>
    </div>
    <div className='navigationbar pb-3 mb-3'>
        <div className="container">
            <div className="navbars">
                <div className='left-nav' style={{ position: "relative" }}>
                    <div className="dropdown">
                        <button data-toggle="dropdown" width="278px" height="40px" className="sc-af134ee5-0 bhijKS"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#E94560" stroke="none" className="tabler-icon tabler-icon-category-filled "><path d="M10 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"></path><path d="M20 3h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"></path><path d="M10 13h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1z"></path><path d="M17 13a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z"></path></svg><div fontWeight="600" color="text.muted" className="sc-aa1b3a14-0 kTvKfm">Categories</div><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-down dropdown-icon"><path d="M6 9l6 6l6 -6"></path></svg></button>
                        <div className="dropdown-menu kkoNVc">
                            <Link to={'/'} className='' style={{ textDecoration: "none", color: "rgb(43, 52, 69)" }}>
                                <div className='link_elemen'>
                                    <div><i className='fa fa-dashcube'></i></div>
                                    <span>Mobiles</span>
                                    <div><i className='fa fa-angle-right'></i></div>
                                </div>
                            </Link>
                            <Link to={'/'} className='' style={{ textDecoration: "none", color: "rgb(43, 52, 69)" }}>
                                <div className='link_elemen'>
                                    <div><i className='fa fa-dashcube'></i></div>
                                    <span>Laptops</span>
                                    <div><i className='fa fa-angle-right'></i></div>
                                </div>
                            </Link>
                            <Link to={'/'} className='' style={{ textDecoration: "none", color: "rgb(43, 52, 69)" }}>
                                <div className='link_elemen'>
                                    <div><i className='fa fa-dashcube'></i></div>
                                    <span>Cameras</span>
                                    <div><i className='fa fa-angle-right'></i></div>
                                </div>
                            </Link>
                            <Link to={'/'} className='' style={{ textDecoration: "none", color: "rgb(43, 52, 69)" }}>
                                <div className='link_elemen'>
                                    <div><i className='fa fa-dashcube'></i></div>
                                    <span>Garments</span>
                                    <div><i className='fa fa-angle-right'></i></div>
                                </div>
                            </Link>
                            <Link to={'/'} className='' style={{ textDecoration: "none", color: "rgb(43, 52, 69)" }}>
                                <div className='link_elemen'>
                                    <div><i className='fa fa-dashcube'></i></div>
                                    <span>Accessories</span>
                                    <div><i className='fa fa-angle-right'></i></div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className='right-nav'>
                    <Link className='Link' to={'/'}>Home</Link>
                    <Link className='Link' to={'/about'}>About Us</Link>
                    {!isauthenticated && 
                        <Link className='Link' to={'/clientregister'}>SignUp</Link>
                    }
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar