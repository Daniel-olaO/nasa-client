import React from 'react';
import {Alert} from '@mui/material';

const Description = () => {
  return (
    <Alert severity="info" className='app-desc'>
      "Get NASA's Astronomy Picture of the Day (APOD)
       in daily text"
    </Alert>
  );
};

export default Description;
