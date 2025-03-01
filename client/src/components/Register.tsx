import React, { useState } from 'react'
import axios from 'axios'


interface ApiResponse {
    success: boolean;
    message: string;
}

const Register = () => {

    const [name, setName] = useState<string>('')
    const [Email, setEmail] = useState<string>('')
    const [Password, setPassword] = useState<string>('')
    const [Data, setData] = useState<ApiResponse |null>(null)
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const api=await axios.post<ApiResponse>('http://localhost:8080/user/register',{name, email:Email, password:Password})
            setData(api.data)
            console.log(api.data);
            localStorage.setItem('token', api.data.token)
            if(api.data.success){
                alert(api.data.message)
            }
            else{
                alert(api.data.message)
            }
            setName('')
            setEmail('')
            setPassword('')

        } catch (error:any) {
            console.log('err in register',error);
            alert(error.api.data.message)
        }
    }

  return (
    <>
    <form onSubmit={(e)=> handleSubmit(e)} className="flex w flex-col justify-center items-center">
        <div className="p-12 rounded-lg border-2 border-gray-00 bg-gray-00 my-3">
            <h1 className="text-2xl font-bold text-center text-blue-500 py-3">Register</h1>
            <div className="flex flex-col gap-4">
            <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="name">name</label>
                    <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" className="p-2 focus:ring-2 focus:ring-blue-500 border border-gray-00 rounded-md" />
                </div>
                <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="email">Email</label>
                    <input required value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-2 focus:ring-2 focus:ring-blue-500 border border-gray-00 rounded-md" />

                </div>
                <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="email">Password</label>
                    <input required value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border border-gray-00 rounded-md" />

                </div>

                <button  className="p-2 bg-blue-500 text-white rounded-md">Register</button>
                <p className='text-center'>Already have an account? <a className='text-blue-500' href="/user/login">Login</a></p>
            </div>
        </div>
    </form >
    </>
  )
}

export default Register
