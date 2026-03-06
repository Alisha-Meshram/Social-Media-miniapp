import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import PostCard from './components/PostCard'
import Comment from './components/Comment'
import Profile from './pages/Profile'

function App() {
 
  return (
    <BrowserRouter>

   
    <>
      
 <Routes>
  <Route path='/' element={<Login />} />
  <Route path='/register' element={<Register />} />
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/create-post' element={<CreatePost />} />
  <Route path='/post-card' element={<PostCard />} />
  <Route path='/comment/:postId' element={<Comment />} />
  <Route path='/profile'  element={<Profile />} />
 </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
