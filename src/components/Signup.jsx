import {React, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Container, Button, Alert, TextField} from '@mui/material';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import '../App.css';
import Navbar from './Navbar';


function signUp(user) {
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
const validationSchema = Yup.object({
  name: Yup
      .string()
      .default('')
      .required('Name is required'),
  phone: Yup
      .string()
      .default('')
      .required('Phone is required')
      .matches(/^\+[0-9]{9,15}$/, 'Invalid phone number: +123456789'),
  email: Yup
      .string()
      .default('')
      .email('Invalid email format')
      .required('Email is required'),
  password: Yup
      .string()
      .default('')
      .required('Password is required'),
});


const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (values) => {
    setLoading(true);
    const response = await signUp(values);
    setLoading(false);
    if (response.id) {
      const loginResponse = await login({
        email: values.email,
        password: values.password,
      });
      if (loginResponse.jwt) {
        const duration = new Date();
        duration.setTime(duration.getTime() + (1 * 60 * 60 * 1000));
        cookies.set('token',
            loginResponse.jwt, {path: '/', expires: duration});
        setIsAuthenticated(true);
        navigate('/home');
      }
    } else {
      setMessage(response.phone[0] || response.email[0] ||
          'error: please try again');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Sign Up</h2>
        <Formik
          initialValues={validationSchema.default()}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await handleSignUp(values);
          }}
        >
          {(props)=>(
            <Form>
              <div className="form-group">
                <Field type="text" name="name" placeholder="Ryan Doe"
                  as={TextField} label="Full Name" variant="filled"/>
                <ErrorMessage name="name" component="div" className="error"/>
              </div>
              <div className="form-group">
                <Field type="text" name="email" placeholder="ryan.doe@abc.com"
                  as={TextField} label="Email" variant="filled"/>
                <ErrorMessage name="email" component="div" className="error"/>
              </div>
              <div className="form-group">
                <Field type="tel" name="phone" placeholder="+123456789"
                  as={TextField} label="Phone" variant="filled"/>
                <ErrorMessage name="phone" component="div" className="error"/>
              </div>
              <div className="form-group">
                <Field type="password" name="password" placeholder="********"
                  as={TextField} label="Password" variant="filled"/>
                <ErrorMessage
                  name="password" component="div" className="error"/>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
      <h5>Already have an account? <Link to="/">Login</Link></h5>
    </>
  );
};

export default Signup;
