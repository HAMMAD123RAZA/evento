import React, { useState } from 'react'
import axios from 'axios'

interface ApiResponse {
    success: boolean;   
    message: string;
    token?: string;
    id?: string;
    newUser?: any;
}

const Register = () => {
    const [name, setName] = useState<string>('')
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [verificationSent, setVerificationSent] = useState<boolean>(false)
    const [Data, setData] = useState<ApiResponse | null>(null)
    const [Message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
          const registerResponse = await axios.post<ApiResponse>(
            'http://localhost:8080/user/register',
            { name, email: Email, password: Password }
          );
          
          setData(registerResponse.data);
          
          if (registerResponse.data.success) {
            // Send verification email
            const verifyResponse = await axios.post(
              'http://localhost:8080/send_email_verify', 
              { email: Email }
            );
            
            if (verifyResponse.data.success) {
              setVerificationSent(true);
              // Store user data without sensitive information
              const userData = {
                id: registerResponse.data.newUser.id,
                name: registerResponse.data.newUser.name,
                email: registerResponse.data.newUser.email,
                token: registerResponse.data.token,
                isVerified: false
              };
              localStorage.setItem('user', JSON.stringify(userData));
              
              // Show verification prompt/message
              setMessage('Registration successful! Please check your email to verify your account.');
            }
          }
        } catch (error: any) {
          console.error('Error in register:', error);
          setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
          setLoading(false);
        }
      };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4">
            {verificationSent ? (
                <div className="flex flex-col items-center justify-center w-full max-w-md">
                    <div className="p-8 md:p-10 rounded-lg border border-gray-700 bg-gray-900 shadow-lg w-full text-center">
                        <div className="mb-6">
                            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4">Verification Email Sent!</h2>
                        <p className="text-gray-300 mb-6">
                            We've sent a verification email to <strong className="text-white">{Email}</strong>.
                            Please check your inbox and click the verification link to activate your account.
                        </p>
                        <p className="text-sm text-gray-400">
                            The verification link will expire in 24 hours.
                        </p>
                        <div className="mt-8">
                            <a href="/user/login" className="text-red-500 hover:text-red-400 transition-colors">
                                Return to Login
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex text-white flex-col justify-center items-center w-full max-w-md">
                    <div className="p-6 md:p-10 rounded-lg border border-gray-700 bg-gray-900 shadow-lg w-full">
                        <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500 py-3 mb-6">Register</h1>
                        <div className="flex flex-col gap-6">
                            <div className="py-1">
                                <label className='block py-2 text-red-400 font-bold' htmlFor="name">Name</label>
                                <input 
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    className="w-full p-3 focus:ring-2 focus:ring-red-500 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400" 
                                />
                            </div>
                            <div className="py-1">
                                <label className='block py-2 text-red-400 font-bold' htmlFor="email">Email</label>
                                <input 
                                    required 
                                    value={Email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full p-3 focus:ring-2 focus:ring-red-500 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400" 
                                />
                            </div>
                            <div className="py-1">
                                <label className='block py-2 text-red-400 font-bold' htmlFor="password">Password</label>
                                <input 
                                    required 
                                    value={Password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500" 
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className={`w-full p-3 text-white rounded-md font-semibold transition-colors ${loading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            
                            <p className='text-center text-gray-400 mt-4'>
                                Already have an account? 
                                <a className='text-red-500 hover:text-red-400 ml-1 transition-colors' href="/user/login">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Register