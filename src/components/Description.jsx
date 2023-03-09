import React from 'react';
import {Alert} from '@mui/material';

const Description = () => {
  return (
    <Alert severity="info" className='app-desc'>
      This app get NASA's Astronomy Picture of the Day (APOD)
       and text it to users' phones everyday.
    </Alert>
  );
};

export default Description;
