/* eslint-disable */
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvata from './pages/SetAvata';

const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Chat />} />
      <Route path='/setAvata' element={<SetAvata />} />
    </Routes>
  )
}

export default App;