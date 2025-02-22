import React from 'react'
import { Link } from 'react-router'


const NavbarData={
menu:[
  {title:"Home",href:'/'},
  {title:"About",href:'/'},
  {title:"Home",href:'/'},
  {title:"Home",href:'/'},

]
}

const Navbar = () => {

  return (
      <div>       
      <div className="flex justify-between px-7 items-center h-16 bg-gray-800 text-black  shadow-sm font-mono">
<div className='Evento'>Logo</div>
<div>
    <ul className='flex space-x-6'>
       {NavbarData.menu.map((item,id)=>{
        return (
          <>
          <Link to={item.href} key={id}>{item.title}</Link>
          </>
        )
})}
    </ul>
</div>
      </div>
    </div>
  )
}

export default Navbar