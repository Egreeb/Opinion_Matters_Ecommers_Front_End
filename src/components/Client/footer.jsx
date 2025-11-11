import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
  return (
    <>
        <footer className="bg-dark text-white shadow mt-auto">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3">About Us</h6>
                        <p className="small ">Designed and developed by <b>Gajendra Dube</b> — a full-stack MERN project highlighting creativity and code, Built with passion using React, Express, and MongoDB </p>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3">Let Us Help</h6>
                        <ul className="list-unstyled small">
                            <li><Link className="text-decoration-none text-white d-block mb-2">Your Account</Link></li>
                            <li><Link className="text-decoration-none text-white d-block mb-2">Your Order</Link></li>
                            <li><Link className="text-decoration-none text-white d-block mb-2">Manage Your content</Link></li>
                            <li><Link className="text-decoration-none text-white d-block ">Help</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3">Quick Links</h6>
                        <ul className="list-unstyled small">
                            <li><Link className="text-decoration-none text-white d-block mb-2">Home</Link></li>
                            <li><Link className="text-decoration-none text-white d-block mb-2">About US</Link></li>
                            <li><Link className="text-decoration-none text-white d-block mb-2">My Cart</Link></li>
                            <li><Link className="text-decoration-none text-white d-block">My Orders</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4">
                        <h6 className="fw-bold text-uppercase mb-3">Contact</h6>
                        <ul className="list-unstyled small text-muted">
                            <li className="mb-2"><i className="fa fa-map-marker mr-2"></i>Dubai,United Arab Emirates</li>
                            <li className="mb-2"><i className="fa fa-envelope mr-2"></i>gajjudube4@gmail.com</li>
                            <li className="mb-2"><i className="fa fa-phone"></i>+971 547241907</li>
                            <li ><i className="fa fa-phone"></i>+91 7218932134</li>
                        </ul>
                    </div>
                </div>

                <hr className="border-secondary-subtle" />
                    <div className="text-center">
                        <p className="small text-white mb-1">
                            Copyright &copy; 2025 All Rights Reserved by <Link to={'https://egreeb.github.io/portfolio/'} className="text-decoration-none text-primary">Gajendra Dube (Junior React Developer)</Link>
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Link to={'https://www.facebook.com/share/1AwejfUoBQ/?mibextid=wwXIfr'}  className=" text-white mr-3"><i className="fa fa-facebook"></i></Link>
                            <Link to={'https://github.com/Egreeb/Opinion_Matters_Ecommers'} className=" text-white mr-3"><i className="fa fa-github"></i></Link>
                            <Link to={'https://www.linkedin.com/in/gajendra-dube-6b5143198?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'} className=" text-white mr-3"><i className="fa fa-linkedin"></i></Link>
                            <Link to={'https://egreeb.github.io/portfolio/'} className=" text-white mr-3"><i className="fa fa-suitcase"></i></Link>
                        </div>
                    </div>

            </div>
        </footer>
    </>
  )
}

export default footer