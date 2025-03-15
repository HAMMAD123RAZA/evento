import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageWrapper({children}) {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}
