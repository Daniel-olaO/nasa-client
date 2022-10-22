import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
