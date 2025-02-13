import React from 'react';
import { Navigate } from 'react-router-dom';
import  isAuthenticated  from "./Auth";

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  // If the user is authenticated, render the element (Home page, for example)
  // If not, redirect to the login page
  return isAuthenticated() ? element : <Navigate to="/"/>;
};

export default PrivateRoute;
