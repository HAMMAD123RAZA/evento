import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between px-7 items-center h-16 bg-gray-800 text-black relative shadow-sm font-mono">
<p className='Evento'>Logo</p>
<div>
    <ul className='flex space-x-6'>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
    </ul>
</div>
      </div>
    </div>
  )
}

export default Navbar