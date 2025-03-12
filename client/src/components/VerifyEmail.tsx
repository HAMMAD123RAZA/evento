import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState<string>('Verifying your email...');
  
  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link. No token provided.');
      return;
    }
    
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/verify-email?token=${token}`);
        console.log('Backend response:', response.data); // Log the backend response
        
        if (response.data.success) {
          setVerificationStatus('success');
          setMessage('Your email has been successfully verified!');
        } else {
          setVerificationStatus('error');
          setMessage(response.data.message || 'Verification failed. Please try again.');
        }
      } catch (error: any) {
        console.error('Error verifying email:', error); // Log the error
        setVerificationStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed. The link may be expired or invalid.');
      }
    };
    
    verifyEmail();
  }, [token]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="p-12 rounded-lg border-2 border-gray-00 bg-gray-00 my-3 text-center max-w-md">
        {verificationStatus === 'verifying' && (
          <>
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Email Verification</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          </>
        )}
        
        {verificationStatus === 'success' && (
          <>
            <h2 className="text-2xl font-bold text-green-500 mb-4">Email Verified!</h2>
            <p className="mb-4">{message}</p>
            <Link 
              to="/user/login" 
              className="block w-full py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
            >
              Log In Now
            </Link>
          </>
        )}
        
        {verificationStatus === 'error' && (
          <>
            <h2 className="text-2xl font-bold text-red-500 mb-4">Verification Failed</h2>
            <p className="mb-4">{message}</p>
            <Link 
              to="/user/register" 
              className="block w-full py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600 transition"
            >
              Back to Registration
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;