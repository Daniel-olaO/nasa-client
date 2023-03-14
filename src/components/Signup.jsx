import {React, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormGroup, Alert} from '@mui/material';
import {useFormik} from 'formik';
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
      .required('Name is required'),
  phone: Yup
      .string()
      .required('Phone is required')
      .matches(/^\+[0-9]{9,15}$/, 'Invalid phone number: +123456789'),
  email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
  password: Yup
      .string()
      .required('Password is required'),
});


const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
    },
  });

  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {loading && <Alert severity="info">Loading...</Alert>}
        {showMessage && <Alert severity="error">{message}</Alert>}
        <h2>Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <TextField id='filled-basic name'
              variant='filled'
              label='Name'
              name='name'
              placeholder='Ryan Doe'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className='form-group'>
            <TextField id='filled-basic email'
              variant='filled'
              label='Email'
              type='email'
              name='email'
              placeholder='ryan.doe@example.com'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className='form-group'>
            <TextField id='filled-basic phone'
              variant='filled'
              label="Phone"
              name="phone"
              type='text'
              placeholder="+123456789"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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
          <div className='form-group'>
            <Button variant="contained"
              type='submit'
            >Sign Up</Button>
          </div>
        </form>
      </Container>
      <h5>Already have an account? <Link to="/">Login</Link></h5>
    </>
  );
};

export default Signup;
