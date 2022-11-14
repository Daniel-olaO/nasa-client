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
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);
  const id = parsedData.id;
  const baseUrl = process.env.API_BASE_URL ||'http://localhost:8000';
  return fetch(`${baseUrl}/api/toggle-subscription/${id}/`, {
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
    console.log(response);
    const cookies = new Cookies();
    localStorage.removeItem('data');
    cookies.remove('token');
    setIsAuthenticated(false);
  };
  const handleClick = async () => {
    const response = await toggleSubscription();
    const dataSet = {
      'id': response.id,
      'name': response.name,
      'isSubscribed': response.isSubscribed,
    };
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(dataSet));
    setIsSubscribed(dataSet.isSubscribed);
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    setIsSubscribed(parsedData.isSubscribed);
  }, [isSubscribed]);
  return (
    <>
      <Navbar />
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
