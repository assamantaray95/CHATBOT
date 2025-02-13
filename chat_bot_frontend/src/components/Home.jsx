import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to import axios
import Chatbot from './Chatbot'; // Assuming you have a Chatbot component

const Home = () => {
  const [Logindata, setLogindata] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showChatbot, setShowChatbot] = useState(false); // State to control chatbot visibility
  const navigate = useNavigate();

  // Function to handle input change
  const handleLogin = (e) => {
    const { name, value } = e.target;
    setLogindata({
      ...Logindata,
      [name]: value,
    });
  };

  // Custom validation function
  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    // Validate Email
    if (!Logindata.email) {
      validationErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(Logindata.email)) {
      validationErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Password
    if (!Logindata.password) {
      validationErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        // Send the login request to the backend API
        const response = await axios.post('http://localhost:8080/api/user/login', {
          email: Logindata.email,
          password: Logindata.password,
        });
        
        // Check for success
        if (response.status === 200 && response.data.token) {
          // Login is successful, store the token in localStorage
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('firstname', response.data.firstname);
          localStorage.setItem('lastname', response.data.lastname);
          navigate('/admin/dashboard'); // Redirect to home page or dashboard after successful login
          window.location.reload();
        } else {
          // If response doesn't contain token, display message
          setErrors({
            email: response.data.message || 'Invalid email or password.',
            password: response.data.message || 'Invalid email or password.',
          });
        }
      } catch (error) {
        // If an error occurs during login, display a generic error message
        console.error('Error during login:', error);
        setErrors({
          email: 'Invalid email or password.',
          password: 'Invalid email or password.',
        });
      }
    }
  };
  
  // Function to toggle the visibility of the chatbot
  const toggleChatbot = () => {
    setShowChatbot(prevState => !prevState); // Toggle the state
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '30rem' }}>
        {/* Login form */}
        {!showChatbot && (
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mt-5 card w-100">
                <h4 className="text-center">Log In</h4>
                <div className="row">
                  <div className="col-md-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={Logindata.email}
                      onChange={handleLogin}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={Logindata.password}
                      onChange={handleLogin}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12 mt-2">
                    <button type="submit" className="btn btn-md btn-primary">
                      <i className="fa fa-arrow-circle-right me-1"></i> Log In
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Chatbot component */}
        {showChatbot && <div className="text-center"><Chatbot /></div>}
      </div>

      {/* Button to toggle the chatbot */}
      <div className="text-end">
        <button
          onClick={toggleChatbot}
          className="text-end"
          style={{ fontSize: '2rem', marginRight: '4rem', marginTop: '-5rem' }}
        >
          <i className="fa fa-comment"></i>
        </button>
      </div>
    </>
  );
};

export default Home;
