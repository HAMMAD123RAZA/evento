import React from 'react'
import { Navigate } from 'react-router-dom'
interface protectedRoute {
    element: JSX.Element
}
const protectedRoute:React.FC<protectedRoute>=( {element}  )=>{
    const token = localStorage.getItem('token')
    return token?element:<Navigate to='/user/login' />
}

export default protectedRoute