import {React, useState} from 'react';
import {Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {FormGroup} from '@mui/material';
import '../App.css';
import Navbar from './Navbar';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert('Email: ' + email + ' Password: ' + password);
  };
  return (

    <>
      <Navbar/>
      <Container maxWidth="sm">
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Name:</InputLabel>
            <Input id="component-simple"
              value={name}
              onChange={(e)=>{
                setName(e.target.value);
              }} />
          </FormControl>
        </FormGroup>
        <FormGroup row={true} className="form-group">
          <FormControl variant="standard">
            <InputLabel htmlFor="component-simple">Email:</InputLabel>
            <Input id="component-simple"
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value);
              }} />
          </FormControl>
        </FormGroup>
        <div>
          <ReactPhoneInput
            defaultCountry={'us'}
            value={phone}
            onChange={(e)=>{
              setPhone(e.target.value);
            }}
          />
        </div>
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
          }}>Sign Up</Button>
      </Container>
      <h5>Already have an account? <Link to="/">Login</Link></h5>
    </>
  );
};

export default Signup;
