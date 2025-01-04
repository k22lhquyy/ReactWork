import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import Service from './components/Service'

function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <Service/>
    </>
  )
}

export default App
