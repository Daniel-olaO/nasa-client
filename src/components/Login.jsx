import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {FormGroup, Alert} from '@mui/material';
import Cookies from 'universal-cookie';
import Navbar from './Navbar';
import '../App.css';


function login(user) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
  return fetch(`${baseUrl}/api/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  })
      .then((data) => data.json());
}

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
    const response = await login({email, password});
    setLoading(false);
    if (response.jwt) {
      const duration = new Date();
      duration.setTime(duration.getTime() + (1 * 60 * 60 * 1000));
      cookies.set('token', response.jwt, {path: '/', expires: duration});
      const dataSet = {
        'id': response.user.id,
        'name': response.user.name,
        'isSubscribed': response.user.isSubscribed,
      };
      localStorage.setItem('data', JSON.stringify(dataSet));
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      setMessage(response.detail);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Login</h2>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Email:</InputLabel>
            <Input
              id="component-simple"
              value={email}
              placeholder="Enter your email"
              onChange={(e)=>{
                setEmail(e.target.value);
              }} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-helper">Password: </InputLabel>
            <Input
              id="component-helper"
              type="password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              aria-describedby="component-helper-text"
            />
          </FormControl>
        </FormGroup>
        <Button variant="contained"
          onClick={()=>{
            handleSubmit(email, password);
          }}>Login</Button>
        <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5>
      </Container>
    </>
  );
};

export default Login;
