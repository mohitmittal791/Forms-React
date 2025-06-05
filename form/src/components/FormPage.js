import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'San Francisco', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal']
};

function FormPage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    showPassword: false, phoneCode: '', phoneNumber: '', country: '',
    city: '', pan: '', aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';

    if (!formData.phoneCode.trim()) newErrors.phoneCode = 'Country code required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!formData.phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = 'Phone number must be 10 digits';

    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';

    if (!formData.pan.trim()) newErrors.pan = 'PAN No. is required';
    else if (!formData.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/))
      newErrors.pan = 'Invalid PAN number format';

    if (!formData.aadhar.trim()) newErrors.aadhar = 'Aadhar No. is required';
    else if (!formData.aadhar.match(/^\d{12}$/))
      newErrors.aadhar = 'Aadhar must be 12 digits';

    return newErrors;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'country' ? { city: '' } : {}) // reset city when country changes
    }));

    // Clear error of the field on input change
    setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      navigate('/success', { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <form onSubmit={handleSubmit} className="form-container" noValidate>
      <h2>Registration Form</h2>

      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          autoComplete="given-name"
        />
        <div className="error">{errors.firstName}</div>
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          autoComplete="family-name"
        />
        <div className="error">{errors.lastName}</div>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <div className="error">{errors.username}</div>
      </div>

      <div className="form-group">
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <div className="error">{errors.email}</div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type={formData.showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          />
          Show Password
        </label>
        <div className="error">{errors.password}</div>
      </div>

      <div className="form-group phone-group">
        <label>Phone Number:</label>
        <input
          name="phoneCode"
          placeholder="+91"
          value={formData.phoneCode}
          onChange={handleChange}
          maxLength={4}
        />
        <input
          name="phoneNumber"
          placeholder="10 digit number"
          value={formData.phoneNumber}
          onChange={handleChange}
          maxLength={10}
        />
      </div>
      <div className="error">{errors.phoneCode || errors.phoneNumber}</div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {Object.keys(countries).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="error">{errors.country}</div>
      </div>

      <div className="form-group">
        <label htmlFor="city">City:</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!formData.country}
        >
          <option value="">Select City</option>
          {formData.country &&
            countries[formData.country].map(city => (
              <option key={city} value={city}>{city}</option>
            ))
          }
        </select>
        <div className="error">{errors.city}</div>
      </div>

      <div className="form-group">
        <label htmlFor="pan">PAN No.:</label>
        <input
          id="pan"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="ABCDE1234F"
          maxLength={10}
        />
        <div className="error">{errors.pan}</div>
      </div>

      <div className="form-group">
        <label htmlFor="aadhar">Aadhar No.:</label>
        <input
          id="aadhar"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
          maxLength={12}
          placeholder="12 digit Aadhar number"
        />
        <div className="error">{errors.aadhar}</div>
      </div>

      <button type="submit" disabled={!isFormValid}>Submit</button>
    </form>
  );
}

export default FormPage;
