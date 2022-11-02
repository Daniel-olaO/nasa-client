import React from 'react';

const ProtectedRoute = ({isAuth, children}) => {
  if (!isAuth) {
    return <h1>Not Authorized</h1>;
  }
  return children;
};


export default ProtectedRoute;
