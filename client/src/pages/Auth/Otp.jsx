import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Logo from './Picture1.png'; // Ensure this is the correct path for your logo

const Otp = () => {
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('Email');
    const newPassword = new URLSearchParams(location.search).get('NewPassword');

    const [otp, setOtp] = useState(Array(6).fill('')); // State for OTP input
    const [loading, setLoading] = useState(false); // Loading state
    const [timer, setTimer] = useState(0); // Timer state
    const [resendClicks, setResendClicks] = useState(0); // Count of resend clicks
    const [canResend, setCanResend] = useState(true); // Resend button enable/disable state
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const otpRefs = useRef([]);

    useEffect(() => {
        // Timer logic
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        // Enable resend button after 10 minutes
        if (!canResend) {
            const timeout = setTimeout(() => {
                setCanResend(true);
                setResendClicks(0);
            }, 10 * 60 * 1000); // 10 minutes
            return () => clearTimeout(timeout);
        }
    }, [canResend]);

    const handleResendOtp = async () => {
        if (resendClicks >= 3) {
            toast.error('You can resend OTP only 3 times. Please wait 10 minutes to try again.');
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${BackendUrl}/resend-otp`, { Email: email });
            setResendClicks(prev => prev + 1);
            setTimer(120); // 2 minutes timer
            // setOtp('')
            toast.success('OTP resent successfully!');
        } catch (error) {
            console.log(error)
            toast.error('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setLoading(true);
            const otpValue = otp.join('');
            const response = await axios.post(`${BackendUrl}/Verify-Otp`, { Email: email, OTP: otpValue,NewPassword:newPassword });
            toast.success('OTP verified successfully!');
            window.location.href=`/login?LoginSource='Verify-Otp-Password'`

        } catch (error) {
            toast.error('Invalid OTP. Please try again.');
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') { // Only allow digits or empty
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < otp.length - 1) {
                otpRefs.current[index + 1].focus(); // Move focus to the next field
            }
        }
    };

    const handleFocus = (index) => {
        otpRefs.current[index].select();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
                <div className="flex justify-center mb-6">
                    <img className="h-12 w-auto" src={Logo} alt="Your Company" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4 sm:mb-6">Enter OTP</h2>
                <p className="text-center text-gray-500 mb-6 sm:mb-8">Please enter the OTP sent to <strong>{email}</strong></p>
                <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    handleVerifyOtp();
                }}>
                    <div className="grid grid-cols-6 space-x-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => otpRefs.current[index] = el}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onFocus={() => handleFocus(index)}
                                className="md:w-14 md:h-14 w-9 h-14 text-center text-xl border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                                maxLength="1"
                            />
                        ))}
                    </div>

                    <div className="text-center mb-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 transition duration-150 ease-in-out"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={!canResend || resendClicks >= 3}
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300 transition duration-150 ease-in-out"
                        >
                            {loading ? 'Resending...' : 'Resend OTP'}
                        </button>
                        {timer > 0 && (
                            <p className="mt-2 text-sm text-gray-500">Resend available in {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
