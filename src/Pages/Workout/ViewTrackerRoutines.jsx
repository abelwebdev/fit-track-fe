import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function TrackWorkout() {
  const [routines, setRoutines] = useState([]);
  const [routineFolders, setRoutineFolders] = useState([]);
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/routines/getroutines`,{ },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setRoutines(response.data.routines);
        setRoutineFolders(response.data.folders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white min-vh-100">
        <div className="flex flex-col justify-center max-w-[1148px] w-full p-4 md:p-6 gap-4 md:gap-6">
          <h1 className="text-lg font-semibold mb-4 text-center pt-5"> Routines </h1>
          {routines.length > 0 ? (
            <>
              {routines.map((routine, index) => (
                <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4" key={index}>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{routine.title}</h3>
                    <p className="mt-2 text-sm text-gray-500 leading-relaxed">{routine.description}</p>
                    <NavLink
                      to={`/dashboard/track-workout/${routine._id}`}
                      className="mt-4 px-5 py-2.5 rounded-lg hover:text-white text-sm tracking-wider border hover:bg-[#F8C146]"
                    >
                      Track Routine
                    </NavLink>
                  </div>
                </div>
              ))}
              {routineFolders.map((folder, index) => (

                <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4" key={index}>
                  <div className="p-6">
                    <div key={folder._id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{folder.title}</h3>
                      </div>
                      {/* Folder Routines */}
                      <div className="mt-3">
                        {folder.routines.map((routine, index) => (
                          <div className="ml-4 mb-3" key={index}>
                            <h3 className="text-lg font-semibold">{routine.title}</h3>
                            <button
                              key={routine._id}
                              onClick={() => navigate(`/dashboard/track-workout/${routine._id}`)}
                              className="mt-4 px-5 py-2.5 rounded-lg hover:text-white text-sm tracking-wider border hover:bg-[#F8C146]"
                            >
                              Track Routine
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <h1 className="flex justify-center">No routines available</h1>
          )}
        </div>
      </div>
    </>
  )
}

export default TrackWorkout