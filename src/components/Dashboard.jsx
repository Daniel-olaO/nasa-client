import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
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
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const response = await logOut();
    console.log(response);
    const cookies = new Cookies();
    localStorage.removeItem('data');
    cookies.remove('token');
    setIsAuthenticated(false);
    navigate('/');
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
