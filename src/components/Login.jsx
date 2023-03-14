import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormGroup, Alert} from '@mui/material';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import Navbar from './Navbar';
import '../App.css';


function login(user) {
  if (user.email && user.password) {
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
}
const validationSchema = Yup.object({
  email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
  password: Yup
      .string()
      .required('Password is required'),
});

const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response = await login(values);
      setLoading(false);
      console.log(response);
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
    },
  });

  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <TextField id='filled-basic email'
              variant='filled'
              label='Email'
              name='email'
              value={formik.values.email}
              placeholder="ryan.doe@example.com"
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className='form-group'>
            <TextField id='filled-basic password'
              variant='filled'
              label='Password'
              name='password'
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="form-group">
            <Button variant="contained"
              type='submit'
            >Login</Button>
          </div>
        </form>

        <h5>Don't have an account? <Link to='/signup'>Sign up</Link></h5>
      </Container>
    </>
  );
};

export default Login;
