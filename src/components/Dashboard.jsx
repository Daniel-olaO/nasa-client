import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {Container, Alert} from '@mui/material';
import Navbar from './Navbar';
import '../App.css';

function logOut() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL ||'http://localhost:8000';
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
  const baseUrl = process.env.REACT_APP_API_BASE_URL ||'http://localhost:8000';
  return fetch(`${baseUrl}/api/toggle-subscription/${id}/`, {
    method: 'POST',
  })
      .then((response) => {
        return response.json();
      });
}

const Dashboard = ({setIsAuthenticated}) => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const response = await logOut();
    if (response.message) {
      const cookies = new Cookies();
      localStorage.removeItem('data');
      cookies.remove('token');
      setIsAuthenticated(false);
      navigate('/');
    }
  };
  const handleClick = async () => {
    setLoading(true);
    const response = await toggleSubscription();
    setLoading(false);
    const dataSet = {
      'id': response.id,
      'name': response.name,
      'isSubscribed': response.isSubscribed,
    };
    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify(dataSet));
    setIsSubscribed(dataSet.isSubscribed);
    setUserName(dataSet.name);
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    setIsSubscribed(parsedData.isSubscribed);
    setUserName(parsedData.name);
  }, [isSubscribed, userName]);
  return (
    <>
      <Navbar userName={userName} logOut={handleLogOut}/>
      <Container maxWidth="sm">
        {loading ? <Alert severity="info">Loading...</Alert> :
          isSubscribed ? <Alert severity="info">
            You are currently subscribed.
            You will get a text with Nasa's Astronomy
            Picture of the Day every day at 12:00 PM UTC.

          </Alert> :
            <Alert severity="info">
              You are currently unsubscribed.
              Subscribe below to get a text with
              Nasa's Astronomy Picture of the Day every day at 12:00 PM UTC.
            </Alert>
        }
        {loading ?
          <button className="btn-loading" disabled>
            Loading...
          </button> :
        isSubscribed ?
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
