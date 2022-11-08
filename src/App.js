import {React, useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import logo from './logo.svg';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedRoute isAuth={isAuthenticated}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
