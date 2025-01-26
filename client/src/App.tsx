import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Card from './components/Card'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import DetailPage from './components/DetailPage'

const App = () => {
  return (
    <>
    <Router>
    <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/card/:id' element={<DetailPage  />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App