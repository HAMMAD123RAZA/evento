import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Data, setData] = useState([])
    const handleSubmit=async()=>{
        try {
            const api=await axios.post('http://localhost:8080/user/register',{name, email:Email, password:Password})
            setData(api.data)
            console.log(api.data);
            if(api.data.success){
                alert(api.data.message)
            }
            else{
                alert(api.data.message)
            }
            setName('')
            setEmail('')
            setPassword('')

        } catch (error) {
            console.log('err in register',error);
            alert(error.api.data.message)
        }
    }

  return (
    <>
    <section className="flex flex-col justify-center items-center">
        <div className="p-10 rounded-lg border-2 border-gray-300 bg-gray-200 my-3">
            <h1 className="text-2xl font-bold text-center text-blue-500 py-3">Register</h1>
            <div className="flex flex-col gap-4">
            <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="name">name</label>
                    <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" className="p-2 focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md" />

                </div>
                <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="email">Email</label>
                    <input required value={Email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="p-2 focus:ring-2 focus:ring-blue-500 border border-gray-300 rounded-md" />

                </div>
                <div className='py-1'>
                    <label className='block py-1 text-blue-500 font-bold ' htmlFor="email">Password</label>
                    <input required value={Password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="p-2 border border-gray-300 rounded-md" />

                </div>

                <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white rounded-md">Register</button>
            </div>
        </div>
    </section>
    </>
  )
}

export default Register
