import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  if (!props.loggedIn) {
    return <Navigate to='/signin' />
  }
  return <Component {...props} />
}

export default ProtectedRoute;
