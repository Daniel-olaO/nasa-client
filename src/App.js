import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
