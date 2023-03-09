import {React, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {FormGroup, Alert} from '@mui/material';
import Cookies from 'universal-cookie';
import '../App.css';
import Navbar from './Navbar';


function signUp(user) {
  if (user.email && user.password && user.name && user.phone) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    return fetch(`${baseUrl}/api/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
        .then((data) => data.json());
  }
}
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


const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    if (password === rePassword && validatePhone(phone)) {
      const response = await signUp({name, email, phone, password});
      setLoading(false);
      if (response) {
        if (response.name) {
          const loginResponse = await login({email, password});
          if (loginResponse.jwt) {
            const duration = new Date();
            duration.setTime(duration.getTime() + (1 * 60 * 60 * 1000));
            cookies.set('token',
                loginResponse.jwt,
                {path: '/', expires: duration},
            );
            const dataSet = {
              'id': loginResponse.user.id,
              'name': loginResponse.user.name,
              'isSubscribed': loginResponse.user.isSubscribed,
            };
            localStorage.setItem('data', JSON.stringify(dataSet));
            setIsAuthenticated(true);
            navigate('/home');
          }
        } else if (!response.name) {
          if (response.email) {
            setMessage(response.email[0]);
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 2000);
          } else if (response.phone) {
            setMessage(response.phone[0]);
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 2000);
          } else {
            const resultMessage= `${response.email[0]} \n ${response.phone[0]}`;
            setMessage(resultMessage);
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 2000);
          }
        }
      } else {
        setMessage('fill all the fields');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
    } else if (!validatePhone(phone)) {
      setLoading(false);
      setMessage('Invalid Phone Number');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } else {
      setLoading(false);
      setMessage('Passwords do not match');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };
  const validatePhone = (phone) => {
    const regex = new RegExp(/^\+[0-9]{9,15}$/);
    if (regex.test(phone)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Sign Up</h2>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Name:</InputLabel>
            <Input id="component-simple"
              placeholder='Ryan Doe'
              value={name}
              onChange={(e)=>{
                setName(e.target.value);
              }}
              required/>
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Email:</InputLabel>
            <Input id="component-simple"
              placeholder='ryan.doe@example.com'
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              required/>
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-helper">Phone: </InputLabel>
            <Input
              id="component-helper"
              type="text"
              placeholder="+123456789"
              pattern="^\+[0-9]{9,15}$"
              value={phone}
              onChange={(e)=>{
                setPhone(e.target.value);
              }}
              aria-describedby="component-helper-text"
              required
            />
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
              required
            />
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-helper">
              Reenter password:
            </InputLabel>
            <Input
              id="component-helper"
              type="password"
              value={rePassword}
              onChange={(e)=>{
                setRePassword(e.target.value);
              }}
              aria-describedby="component-helper-text"
              required
            />
          </FormControl>
        </FormGroup>
        <Button variant="contained"
          onClick={()=>{
            handleSubmit();
          }}>Sign Up</Button>
      </Container>
      <h5>Already have an account? <Link to="/">Login</Link></h5>
    </>
  );
};

export default Signup;
