import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Container, Button, Alert, TextField} from '@mui/material';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Navbar from './Navbar';
import Description from './Description';
import '../App.css';

function login(user) {
  if (user.email && user.password) {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
    return axios.post(`${baseUrl}/api/login`, user)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          return error.response.data;
        });
  }
}
const validationSchema = Yup.object({
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

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (values) => {
    setLoading(true);
    const response = await login(values);
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
    } else if (response.detail) {
      setMessage(response.detail);
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
        <Description/>
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Login</h2>
        <Formik
          initialValues={validationSchema.default()}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await handleLogin(values);
          }}
        >
          {(props)=>(
            <Form>
              <div className="form-group">
                <Field name="email" type="email"
                  as={TextField} label="Email" variant="filled"
                />
                <ErrorMessage name="email" component="div" className="error"/>
              </div>
              <div className="form-group">
                <Field name="password" type="password"
                  as={TextField} label="Password"
                  variant="filled"/>
                <ErrorMessage name="password" component="div"className="error"/>
              </div>
              <div className="form-group">
                <Button type="submit" variant="contained" color="primary">
                Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <h5>Don't have an account? <Link to='/signup'>
            Create Account
        </Link></h5>
      </Container>
    </>
  );
};

export default Login;
