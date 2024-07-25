import React, { useState } from 'react';
import Logo from './Picture1.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ForgetPasswords = () => {
  const [Email, setEmail] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const HandleResetPasswordRequest = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true

    try {
      // Make API request to change password
      const response = await axios.post(`${BackendUrl}/Password-Change`, { Email, NewPassword });
      console.log(response.data);
      toast.success('Password reset request successful. Check your email!');
      window.location.href=`/Otp?Email=${Email}&NewPassword=${NewPassword}`
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to send password reset request. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={Logo}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forget Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={HandleResetPasswordRequest}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
                <div className="text-sm">
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    I Remember My password 😀
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={NewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full px-2 text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading} // Disable button during loading
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (

                  <i class="fa-solid fa-brain h-5 w-5 animate-spin fa-fw"></i>
                  // Spinner icon
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create A new Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswords;
