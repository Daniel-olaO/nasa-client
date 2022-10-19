import {React, useState} from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {FormGroup} from '@mui/material';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert('Email: ' + email + ' Password: ' + password);
  };
  return (
    <Container maxWidth="sm">
      <FormGroup row={true} className="form-group">
        <FormControl variant="standard">
          <InputLabel htmlFor="component-simple">Email:</InputLabel>
          <Input id="component-simple" value={email} onChange={(e)=>{
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
    </Container>
  );
};

export default Login;