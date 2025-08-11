import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './pages/LoadingScreen'
import QuizReady from './pages/QuizReady'
import Quiz from './pages/Quiz'
import QuizResults from './pages/QuizResult'

function App() {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loading' element={<LoadingScreen/>}/>
        <Route path='/ready' element={<QuizReady/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/result' element={<QuizResults/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App