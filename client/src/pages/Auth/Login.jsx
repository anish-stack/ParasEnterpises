import React, { useEffect, useState } from 'react';
import Logo from './Picture1.png';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Make sure to import toast for notifications

const Login = () => {
    const location = useLocation();
    const [navigate, setNavaigate] = useState()
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const afterLogin = queryParams.get('AfterLogin');
        setNavaigate(afterLogin)
    }, [location]);
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    // Validate password (must be at least 6 characters and contain letters and numbers)
    const validatePassword = (password) => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password);

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validatePassword(formData.Password)) {
            setErrorMessage('Password must be at least 6 characters long and contain letters and numbers.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        try {
            const res = await axios.post(`${BackendUrl}/Login`, formData);
            // console.log('Login successful:', res.data);
            toast.success('Login successful!');
            const token = res.data.token;
            const expiresIn = 3600000; // 1 hour in milliseconds
            const expirationTime = new Date().getTime() + expiresIn; // Current time + 1 hour
            // Save token and expiration time to localStorage
            localStorage.setItem('ParasUserToken', token);
            localStorage.setItem('ParasUserTokenExpired', expirationTime.toString());

            if (navigate) {
                window.location.href = `${navigate}?login='true'`
            } else {
                window.location.href = `/?isLoggedIn=true&LoginBy='Login-source&token=${token}`;
            }

        } catch (error) {
            setErrorMessage(error.response?.data?.msg || 'Login failed. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="/Forget-Password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="relative mt-2">
                            <input
                                id="Password"
                                name="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.Password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

                    {errorMessage && (
                        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create a new account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
