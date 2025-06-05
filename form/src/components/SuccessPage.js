import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract form data passed from FormPage via state
  const formData = location.state;

  // If no data, redirect back to form
  if (!formData) {
    navigate('/');
    return null;
  }

  return (
    <div className="success-container">
      <h2>Form Submitted Successfully!</h2>

      <div className="success-details">
        <div className="success-item">
          <strong>First Name:</strong> <span>{formData.firstName}</span>
        </div>
        <div className="success-item">
          <strong>Last Name:</strong> <span>{formData.lastName}</span>
        </div>
        <div className="success-item">
          <strong>Username:</strong> <span>{formData.username}</span>
        </div>
        <div className="success-item">
          <strong>Email:</strong> <span>{formData.email}</span>
        </div>
        <div className="success-item">
          <strong>Phone:</strong> <span>{formData.phoneCode} {formData.phoneNumber}</span>
        </div>
        <div className="success-item">
          <strong>Country:</strong> <span>{formData.country}</span>
        </div>
        <div className="success-item">
          <strong>City:</strong> <span>{formData.city}</span>
        </div>
        <div className="success-item">
          <strong>PAN Number:</strong> <span>{formData.pan}</span>
        </div>
        <div className="success-item">
          <strong>Aadhar Number:</strong> <span>{formData.aadhar}</span>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        Go Back
      </button>
    </div>
  );
};

export default SuccessPage;
