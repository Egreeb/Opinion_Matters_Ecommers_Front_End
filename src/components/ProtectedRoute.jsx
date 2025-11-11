import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'
import { useNavigate,Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {token} = useContext(AppContext)
    const navigate = useNavigate()
    if(!token){
         return <Navigate to="/admin" replace />;
    }
  return children
}

export default ProtectedRoute