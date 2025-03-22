import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


interface ApiResponse {
    success: boolean;
    message: string;
}

const Login:React.FC = () => {

    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [Data, setData] = useState<ApiResponse | null>(null)
    const navigate=useNavigate()
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const api=await axios.post<ApiResponse>('http://localhost:8080/user/login',{ email:Email, password:Password})
            setData(api.data)
            console.log(api.data);
            localStorage.setItem('token', api.data.token)
            if(api.data.success){
                alert(api.data.message)
            }
            else{
                alert(api.data.message)
            }
            localStorage.setItem('user', JSON.stringify(api.data))
            setEmail('')
            setPassword('')
            navigate('/')
        } catch (error:any) {
            console.log('err in login',error);
            alert(error.api.data.message)
            alert(error)
        }
    }

  return (
    <>
    <form onSubmit={(e)=> handleSubmit(e)}  className="flex text-white flex-col justify-center items-center">
        <div className="p-10 rounded-lg border-2 border-gray-300 bg-gray-950 my-3">
            <h1 className="text-2xl font-bold text-center text-red-500 py-3">Login</h1>
            <div className="flex flex-col gap-4 ">
     
                <div className='py-1'>
                    <label className='block py-1 text-red-500 font-bold ' htmlFor="email">Email</label>
                    <input required value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-2 focus:ring-2 focus:ring-red-500 bg-gray-950 border border-gray-300 rounded-md" />

                </div>
                <div className='py-1'>
                    <label className='block py-1 text-red-500 font-bold ' htmlFor="email">Password</label>
                    <input required value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 bg-gray-950 border border-gray-300 rounded-md" />

                </div>

                <button className="p-2 bg-red-500 text-white rounded-md">login</button>
                <p className='text-center'>Don't have an account? <a className='text-red-500' href="/user/register">Signup</a></p>
            </div>
        </div>
    </form>
    </>
  )
}

export default Login
