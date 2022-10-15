import React from 'react';
import logo from './logo.svg';
import {Route, Routes} from 'react-router-dom';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
