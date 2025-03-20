import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Retrieve the token
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!token) {
        navigate('/login');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}/api/verify-token`, {}, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          }
        });
        if (response.data.message === 'Token is valid') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error: ", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate, token, apiUrl]);
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);
  return isAuthenticated ? element : null;
};

export default ProtectedRoute;