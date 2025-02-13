import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  


const Register = () => {

  const navigate = useNavigate();

  // State for form data and errors
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Custom validation function
  const validate = () => {
    let validationErrors = {};
    let isValid = true;

    // Validate First Name
    if (!formData.firstName) {
      validationErrors.firstName = 'First Name is required.';
      isValid = false;
    }

    // Validate Last Name
    if (!formData.lastName) {
      validationErrors.lastName = 'Last Name is required.';
      isValid = false;
    }

    // Validate Email
    if (!formData.email) {
      validationErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      validationErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Confirm Password is required.';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
       // Proceed with form submission logic (e.g., API call)
       try {
        const response = await axios.post('http://localhost:8080/api/user/register', formData);
        
        if (response.data === 'success') {
          setMessage('Registration successful!');
          // Optionally redirect or clear the form after successful registration
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setErrors({});
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setMessage('Registration Not successful!');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setMessage('Error registering user, please try again');
      }
    }
  };

  return (
    <>
      {message && (
        <div className='mt-3 text-center' style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
          {message}
        </div>
      )}
    <div className="mt-5" style={{ padding: '50px', maxWidth: '700px', margin: 'auto', backgroundColor: '#dddddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', }}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label className="mt-2" htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange}/>
            {errors.firstName && (<p style={{ color: 'red' }}>{errors.firstName}</p>)}
          </div>
          <div className="col-md-6">
            <label className="mt-2" htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange}/>
            {errors.lastName && (<p style={{ color: 'red' }}>{errors.lastName}</p>)}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <label className="mt-2" htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
        </div>
        <div className="row mt-3 mb-2">
          <div className="col-md-6">
            <label className="mt-2" htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleInputChange}/>
            {errors.password && (<p style={{ color: 'red' }}>{errors.password}</p>)}
          </div>
          <div className="col-md-6">
            <label className="mt-2" htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}/>
            {errors.confirmPassword && (<p style={{ color: 'red' }}>{errors.confirmPassword}</p>)}
          </div>
        </div>
        <button type="submit" className="btn btn-md btn-outline-primary mt-4"><i className='fa fa-arrow-circle-right me-1'></i> Register</button>
      </form>
    </div>
    </>
  );
};

export default Register;
