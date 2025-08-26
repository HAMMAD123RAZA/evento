// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


// interface ApiResponse {
//     success: boolean;
//     message: string;
// }

// const Login:React.FC = () => {

//     const [Email, setEmail] = useState<string>('')
//     const [Password, setPassword] = useState<string>('')
//     const [Data, setData] = useState<ApiResponse | null>(null)
//     const navigate=useNavigate()
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault()
//         try {
//             const api = await axios.post<ApiResponse>('http://localhost:8080/user/login', { 
//                 email: Email, 
//                 password: Password 
//             })
            
//             setData(api.data)
//             console.log(api.data);
//                         localStorage.setItem('token', api?.data?.token)

//             if(api.data.success){
//                 const userData = {
//                     ...api.data,
//                     loginTime: new Date().toISOString() 
//                 }
                
//                 localStorage.setItem('user', JSON.stringify(userData))
//                 alert(api.data.message)
//                 setEmail('')
//                 setPassword('')
//                 navigate('/')
//             } else {
//                 alert(api.data.message)
//             }
//         } catch (error: any) {
//             console.log('err in login', error);
//             alert(error.response?.data?.message || 'Login failed')
//         }
//     }

//   return (
//     <>
//     <form onSubmit={(e)=> handleSubmit(e)}  className="flex text-white flex-col justify-center items-center">
//         <div className="p-10 rounded-lg border-2 border-gray-300 bg-gray-950 my-3">
//             <h1 className="text-2xl font-bold text-center text-red-500 py-3">Login</h1>
//             <div className="flex flex-col gap-4 ">
     
//                 <div className='py-1'>
//                     <label className='block py-1 text-red-500 font-bold ' htmlFor="email">Email</label>
//                     <input required value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-2 focus:ring-2 focus:ring-red-500 bg-gray-950 border border-gray-300 rounded-md" />

//                 </div>
//                 <div className='py-1'>
//                     <label className='block py-1 text-red-500 font-bold ' htmlFor="email">Password</label>
//                     <input required value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 bg-gray-950 border border-gray-300 rounded-md" />

//                 </div>

//                 <button className="p-2 bg-red-500 text-white rounded-md">login</button>
//                 <p className='text-center'>Don't have an account? <a className='text-red-500' href="/user/register">Signup</a></p>
//             </div>
//         </div>
//     </form>
//     </>
//   )
// }

// export default Login


import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: any;
}

const Login:React.FC = () => {
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [Data, setData] = useState<ApiResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const api = await axios.post<ApiResponse>('http://localhost:8080/user/login', { 
                email: Email, 
                password: Password 
            })
            
            setData(api.data)
            console.log(api.data);
            
            if(api.data.success){
                // Store login timestamp along with user data
                const userData = {
                    ...api.data,
                    loginTime: new Date().toISOString()
                }
                
                localStorage.setItem('user', JSON.stringify(userData))
                localStorage.setItem('token', api.data.token || '')
                alert(api.data.message)
                setEmail('')
                setPassword('')
                navigate('/')
            } else {
                alert(api.data.message)
            }
        } catch (error: any) {
            console.log('err in login', error);
            alert(error.response?.data?.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-8 px-4">
            <form onSubmit={handleSubmit} className="flex text-white flex-col justify-center items-center w-full max-w-md">
                <div className="p-6 md:p-10 rounded-lg border border-gray-700 bg-gray-900 shadow-lg w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500 py-3 mb-6">Login</h1>
                    <div className="flex flex-col gap-6">
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
                            disabled={isLoading}
                            className={`w-full p-3 text-white rounded-md font-semibold transition-colors ${isLoading ? 'bg-red-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        
                        <p className='text-center text-gray-400 mt-4'>
                            Don't have an account? 
                            <a className='text-red-500 hover:text-red-400 ml-1 transition-colors' href="/user/register">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login