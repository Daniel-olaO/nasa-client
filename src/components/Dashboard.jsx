import {React, useState, useEffect} from 'react';
import {Container, Alert} from '@mui/material';
import Navbar from './Navbar';
import '../App.css';

function logOut() {
  const baseUrl = process.env.API_BASE_URL ||'http://localhost:8000';
  return fetch(baseUrl + '/api/logout', {
    method: 'POST',
  })
      .then((response) => {
        return response.json();
      });
}
function toggleSubscription() {
  const id = localStorage.getItem('data').id;
  const baseUrl = process.env.API_BASE_URL ||'http://localhost:8000';
  return fetch(baseUrl + '/api/toggle-subscription/' + id, {
    method: 'POST',
  })
      .then((response) => {
        return response.json();
      });
}

const Dashboard = ({setIsAuthenticated}) => {
  const [isSubscribed, setIsSubscribed] = useState(true);

  const logOut = async () => {
    const response = await logOut();
    const cookies = new Cookies();
    localStorage.removeItem('data');
    cookies.remove('token');
    setIsAuthenticated(false);
  };
  const handleClick = async () => {
    const response = await toggleSubscription();
    setIsSubscribed(response.isSubscribed);
  };

  useEffect(() => {
    setIsSubscribed(localStorage.getItem('data').isSubscribed);
  }, []);
  return (
    <>
      <Navbar/>
      <Container maxWidth="sm">
        {isSubscribed ? (
                  <Alert severity="info">
                    You are subscribed to our Nasa APOD.
                  </Alert>
                ) : (
                  <Alert severity="info">
                    You are not subscribed to our Nasa APOD.
                  </Alert>
                    )
        }
        {isSubscribed ?
            <button className="btn-danger"
              onClick={()=>{
                handleClick();
              }}>
                Unsubscribe
            </button> :
            <button className="btn-success"
              onClick={()=>{
                handleClick();
              }}>
                Subscribe
            </button>}
      </Container>
    </>
  );
};

export default Dashboard;
