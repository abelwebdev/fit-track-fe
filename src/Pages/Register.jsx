/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from "react-router";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from 'react-loader-spinner'

const apiUrl = import.meta.env.VITE_API_URL;

function Register() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error when user types
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.username?.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.password?.trim()) {
      newErrors.password = "Password is required.";
    }
    if (!formData.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    // If there are errors, set loading to false and return false
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return false;
    }
    return true; // No errors
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const sendData = async () => {
        try {
          const response = await axios.post(`${apiUrl}/api/register`, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setData(response.data);
          if (response.data.message == "User registered successfully.") {
            toast.success(response.data.message)
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          } else if(response.data.message == "Email already exists") {
            toast.error("Email already exists'")
          }
        } catch (error) {
          setError('Failed to fetch data');
          console.error(error);
          toast.error(error.response.data.message)
        } finally {
          setLoading(false);
        }
      };
      sendData();
    }
  };
  return (
    <div className=" flex items-center justify-center min-h-screen p-4">
      <div><Toaster/></div>
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
        <a href="#" className="flex items-center justify-center">
          <img src="/fit-blend.png" alt="logo" className="" />
        </a>
        <h2 className="text-2xl font-bold text-center text-black mb-8">Create an Account</h2>
        <form id="registrationForm" className="space-y-6" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-black font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8C146] transition-all duration-300`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-black font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8C146] transition-all duration-300`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-black font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8C146] transition-all duration-300`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-black font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F8C146] transition-all duration-300`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            onClick={() => setLoading(true)}
            className="w-full bg-[#F8C146] text-white py-3 rounded-lg font-semibold hover:bg-[#F8C146] focus:outline-none focus:ring-2 focus:ring-[#F8C146] focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Register
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
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <Link to="/login">
            <a className="text-[#F8C146] font-semibold transition-colors duration-300">Sign In</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register