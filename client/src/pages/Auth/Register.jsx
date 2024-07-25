import React, { useState } from 'react';
import Logo from './Picture1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
const Register = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '',
    Password: '',
    ConfirmPassword: '' // Add ConfirmPassword field
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For toggling confirm password visibility

  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate contact number (must be numeric and up to 10 digits)
  const validateContactNumber = (number) => /^[0-9]{1,10}$/.test(number);

  // Validate password (must be at least 6 characters and contain letters and numbers)
  const validatePassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password);

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateContactNumber(formData.ContactNumber)) {
      setErrorMessage('Contact number must be numeric and up to 10 digits.');
      return;
    }

    if (!validatePassword(formData.Password)) {
      setErrorMessage('Password must be at least 6 characters long and contain letters and numbers.');
      return;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post(`${BackendUrl}/Create-User`, formData);
      console.log('Registration successful:', res.data);
      // Redirect or show success message
      toast.success('Registration successful Please Check Email Thankyou !')
      const token = res.data.token;
      const expiresIn = 3600000; // 1 hour in milliseconds
      const expirationTime = new Date().getTime() + expiresIn; // Current time + 1 hour
      // Save token and expiration time to localStorage
      localStorage.setItem('ParasUserToken', token);
      localStorage.setItem('ParasUserTokenExpired', expirationTime.toString());
      window.location.href = `/?token=${token}&isLoggedIn=true`
    } catch (error) {
      setErrorMessage(error.response?.data?.msg);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl whitespace-nowrap font-bold leading-9 tracking-tight text-gray-900">
          Register Yourself With Paras Enterprises
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="FullName" className="block text-sm font-medium leading-6 text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="FullName"
                name="FullName"
                type="text"
                value={formData.FullName}
                onChange={handleChange}
                autoComplete="name"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="Email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="ContactNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Contact Number
            </label>
            <div className="mt-2">
              <input
                id="ContactNumber"
                name="ContactNumber"
                type="text"
                value={formData.ContactNumber}
                onChange={handleChange}
                autoComplete="tel"
                required
                className="block w-full px-2 text-xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="Password"
                name="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.Password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye" style={{ color: '#aaa' }}></i>
                ) : (
                  <i className="fa-solid fa-eye-slash" style={{ color: '#aaa' }}></i>
                )}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                id="ConfirmPassword"
                name="ConfirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.ConfirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="block w-full  px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmPassword ? (
                  <i className="fa-solid fa-eye" style={{ color: '#aaa' }}></i>
                ) : (
                  <i className="fa-solid fa-eye-slash" style={{ color: '#aaa' }}></i>
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In With Email Id
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
