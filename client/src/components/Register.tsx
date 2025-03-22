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
          // Register the user
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
        <>
            {verificationSent ? (
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="p-12 rounded-lg border-2 border-gray-00 bg-gray-00 my-3 text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Verification Email Sent!</h2>
                        <p className="mb-4">
                            We've sent a verification email to <strong>{Email}</strong>.
                            Please check your inbox and click the verification link to activate your account.
                        </p>
                        <p className="text-sm text-gray-500">
                            The verification link will expire in 24 hours.
                        </p>
                    </div>
                </div>
            ) : (
                <form onSubmit={(e) => handleSubmit(e)} className=" text-white flex flex-col justify-center items-center">
                    <div className="p-12 rounded-lg border-2 border-gray-200 bg-gray-950 my-3">
                        <h1 className="text-2xl font-bold text-center text-red-500 py-3">Register</h1>
                        <div className="flex flex-col gap-4">
                            <div className='py-1'>
                                <label className='block  py-1 text-red-500 font-bold' htmlFor="name">Name</label>
                                <input 
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    type="text" 
                                    placeholder="Name" 
                                    className="p-2 focus:ring-2 bg-gray-950 focus:ring-red-500 border border-gray-00 rounded-md w-full" 
                                />
                            </div>
                            <div className='py-1'>
                                <label className='block py-1 text-red-500 font-bold' htmlFor="email">Email</label>
                                <input 
                                    required 
                                    value={Email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    placeholder="Email" 
                                    className="p-2 focus:ring-2 bg-gray-950 focus:ring-red-500 border border-gray-00 rounded-md w-full" 
                                />
                            </div>
                            <div className='py-1'>
                                <label className='block py-1 text-red-500 font-bold' htmlFor="password">Password</label>
                                <input 
                                    required 
                                    value={Password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="Password" 
                                    className="p-2 border 
bg-gray-950 border-gray-00 rounded-md w-full" 
                                />
                            </div>

                            <button 
                                disabled={loading} 
                                className={`p-2 bg-red-500 text-white rounded-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                            <p className='text-center'>Already have an account? <a className='text-red-500' href="/user/login">Login</a></p>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}

export default Register