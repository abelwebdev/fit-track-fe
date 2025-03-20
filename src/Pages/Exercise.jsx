import { useEffect, useState } from "react";
import { useNavigate, useParams, Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

function Exercise() {
  const token = localStorage.getItem('token');
  const { exerciseId } = useParams('');
  const [exerciseData, setExerciseData] = useState('');



  useEffect(() => {
    // Define a function to handle the POST request
    const postExerciseData = async () => {
      try {
        const response = await axios.post(`${apiUrl}/exercises/getexercise`, { exerciseId: exerciseId }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setExerciseData(response.data)
      } catch (error) {
        console.error('Error posting exercise data:', error);
      }
    };
    if (exerciseId) {
      postExerciseData();
    }
  }, [exerciseId]);

  return (
    <>
      {exerciseData ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
              {exerciseData.gifurl && (
                <img
                  src={exerciseData.gifurl}
                  alt="Exercise Gif"
                  className="w-72 h-72 mx-auto mb-4"
                />
              )}
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-xl font-semibol dark:text-white mb-4">
                {exerciseData.name
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                }              
              </h2>
              <p className=" mb-6">
                Equipment: <span className="text-gray-500">{exerciseData.equipment}</span>
              </p>
              <p className="mb-6">
                Target: <span className="text-gray-500"> {exerciseData.target} </span>
              </p>
              <p className=" mb-6">
                Secondary: <span className="text-gray-500"> {exerciseData.secondary.join(', ')} </span>
              </p>
            </div>
          </div>
        </div>
      ) : (   
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <img
            src="/fit-blend.png" // Replace with the actual logo path
            alt="Logo"
            className="mb-4 w-16 h-16 md:w-16 md:h-16 lg:w-16 lg:h-16" // Responsive sizing
          />
          <p className="text-center text-gray-500 text-base md:text-lg lg:text-xl">
            Select exercise to see details...
          </p>
        </div>
      )}
    </>
  )
}

export default Exercise