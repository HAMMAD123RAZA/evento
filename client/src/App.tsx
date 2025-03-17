import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Card from './components/Card'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import DetailPage from './components/DetailPage.jsx'
// import SavedItems from './components/SavedItems'
import AdminHome from './admin/AdminHome'
import EventCreate from './admin/EventCreate'
import EventList from './admin/EventList'
import Login from './components/Login'
import Register from './components/Register'
import SavedItems from './components/SavedItems'
import ProtectedRoute from './auth/ProtectedRoute'
import VerifyEmail from './components/verifyEmail.tsx'
import Events from './components/Events.tsx'
import Upcoming from './components/UpComing'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
import AdminMsg from './admin/AdminMsg.jsx'
import CreateBlog from './admin/AdminBlogs.jsx'
import DetailBlog from './components/blog/DetailBlog.jsx'
import EventsAdmin from './admin/EventsAdmin.jsx'

const App = () => {
  return (
    <>
<Router>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/card/:id' element={<DetailPage />} />
    <Route path="/saved" element={<ProtectedRoute element={<SavedItems />} />} />
    <Route path="/events" element={<ProtectedRoute element={<Events />} />} />

    <Route path='/admin' element={<ProtectedRoute element={<AdminHome />} />} />
    <Route path='/admin/event/create' element={<ProtectedRoute element={<EventCreate />} />} />
    <Route path='/admin/event/list' element={<ProtectedRoute element={<EventList />} />} />
    <Route path='/user/login' element={<Login />} />
    <Route path='/user/register' element={<Register />} />
    <Route path='/verify-email' element={<VerifyEmail />} /> 
    <Route path='/blog' element={<Upcoming />} /> 
    <Route path='/user' element={<UserProfile />} /> 
    <Route path='/admin/msg' element={<AdminMsg />} /> 
    <Route path='/admin/blog' element={<CreateBlog />} /> 
    <Route path='/blog/:id' element={<DetailBlog/>} /> 
    <Route path='/admin/event' element={<EventsAdmin/>} /> 
    
  </Routes>
</Router>
    </>
  )
}

export default App