import {React, useState} from 'react';
import Container from '@mui/material/Container';
import '../App.css';

const Dashboard = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);
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
