import {React, useState, useEffect} from 'react';
import Container from '@mui/material/Container';
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
      <Container maxWidth="sm">
        {/* make info alert box */}
        <div className="info">
          {isSubscribed ? (
                  <p>Your subscription is active</p>
                ) : (
                      <p>Your subscription is inactive</p>
                    )
          }
        </div>
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
