/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const token = localStorage.getItem('token'); // Retrieve the token
  let navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(`${apiUrl}/api/verify-token`, {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        });
        if (response.data.message === 'Token is valid') {
          navigate("/dashboard")
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };

    checkAuthentication();
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const sendData = async () => {
        try {
          const response = await axios.post(`${apiUrl}/api/login`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setData(response.data);
          if(response.data.msg == 'Login successful') {
            localStorage.setItem('token', response.data.token); // Save the token
            navigate('/dashboard')
          }
          toast.success("Login Successful")
        } catch (err) {
          setError('Failed to fetch data');
          console.error(err);
          toast.error(err.response.data.msg)
        } finally {
          setLoading(false);
        }
      };
      sendData();  
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !formData.password) {
      newErrors.email = "Both email and password are required.";
      newErrors.password = "Both email and password are required.";
      setErrorMessage("Both email and password are required.");
    }
    setErrors(newErrors);
    // If there are errors, set loading to false and return false
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return false;
    }
    return true; // No errors
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 p-4">
      <div><Toaster/></div>
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl px-8 py-6 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01] animate-fade-in">
        <a href="#" className="flex items-center justify-center">
          <img src="/fit-blend.png" alt="logo" className="" />
        </a>
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-gray-200">Welcome Back!</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm rounded-lg w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F8C146] dark:focus:ring-[#F8C146] transition-all duration-300"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-lg w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F8C146] dark:focus:ring-[#F8C146] transition-all duration-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button
            type="submit"
            onClick={() => setLoading(true)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F8C146] hover:bg-[#F8C146] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F8C146] transform transition-all duration-300 hover:scale-[1.02] dark:ring-offset-gray-900"
          >
            Login
          </button>
          {loading && 
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <Oval
                visible={true}
                height={80}
                width={80}
                color="#F8C146"
                secondaryColor="#F8C146"
                ariaLabel="oval-loading"
              />
            </div>
          }
            <p className="text-center text-gray-600 mt-2">
              Don&apos;t have an account?
              <Link to="/register">
                <a className="text-[#F8C146] font-semibold transition-colors duration-300">Register</a>
              </Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Login