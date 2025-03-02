import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const VerifyEmail:React.FC = () => {
    const [verifying, setVerifying] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        const verifyUserEmail = async () => {
            // Get query parameters from URL
            const searchParams = new URLSearchParams(location.search)
            const userId = searchParams.get('userId')
            const token = searchParams.get('token')
            
            if (!userId || !token) {
                setVerifying(false)
                setSuccess(false)
                setMessage('Invalid verification link')
                return
            }
            
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/verify-email?userId=${userId}&token=${token}`
                )
                
                setVerifying(false)
                
                if (response.data.success) {
                    setSuccess(true)
                    setMessage(response.data.message || 'Your email has been successfully verified!')
                } else {
                    setSuccess(false)
                    setMessage(response.data.message || 'Email verification failed')
                }
            } catch (error: any) {
                setVerifying(false)
                setSuccess(false)
                setMessage(error.response?.data?.message || 'Email verification failed')
            }
        }
        
        verifyUserEmail()
    }, [location])
    
    const handleRedirectToLogin = () => {
        navigate('/user/login')
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="p-12 rounded-lg border-2 border-gray-00 bg-gray-00 my-3 text-center max-w-md">
                <h1 className="text-2xl font-bold text-blue-500 mb-4">Email Verification</h1>
                
                {verifying ? (
                    <div className="flex flex-col items-center">
                        <p className="mb-4">Verifying your email...</p>
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : success ? (
                    <div>
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <p className="mb-6">{message}</p>
                        <button 
                            onClick={handleRedirectToLogin}
                            className="p-2 bg-blue-500 text-white rounded-md w-full"
                        >
                            Login to Your Account
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-center mb-4">
                            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <p className="mb-6">{message}</p>
                        <p className="text-sm">
                            If you're having trouble verifying your email, please contact support.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerifyEmail