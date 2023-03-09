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
function toggleSubscription(id) {
  const baseUrl = process.env.REACT_APP_API_BASE_URL ||'http://localhost:8000';
  return fetch(`${baseUrl}/api/toggle-subscription/${id}/`, {
    method: 'PUT',
  })
      .then((response) => {
        return response.json();
      });
}

const Dashboard = ({setIsAuthenticated}) => {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
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
    const response = await toggleSubscription(id);
    setLoading(false);
    setIsSubscribed(response.isSubscribed);
    setUserName(response.name);
    setId(response.id);
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    setIsSubscribed(parsedData.isSubscribed);
    setUserName(parsedData.name);
    setId(parsedData.id);
  }, []);
  return (
    <>
      <Navbar userName={userName} logOut={handleLogOut}/>
      <Container maxWidth="sm">
        {loading ? <Alert severity="info">Loading...</Alert> :
          isSubscribed ? <Alert severity="info">
            You are subscribed to nasa APOD
          </Alert> :
            <Alert severity="info">
              You are not subscribed to nasa APOD
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
