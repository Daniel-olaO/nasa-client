import {React, useState} from 'react';
import {Container, Alert} from '@mui/material';
import Navbar from './Navbar';
import '../App.css';

const Dashboard = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
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
                setIsSubscribed(!isSubscribed);
              }}>
                Unsubscribe
            </button> :
            <button className="btn-success"
              onClick={()=>{
                setIsSubscribed(!isSubscribed);
              }}>
                Subscribe
            </button>}
      </Container>
    </>
  );
};

export default Dashboard;
