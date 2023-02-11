import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const NotFound = () => {
  return (
    <Link to='/'>
      <div className='not-found'> </div>
    </Link>
  );
};

export default NotFound;
