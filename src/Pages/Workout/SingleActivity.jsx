import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

function SingleActivity() {
  const token = localStorage.getItem('token'); 
  const { workoutId } = useParams();
  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handledelete = () => {
    setShowModal(true);
  };
  const confirmDelete = () => {
    closeModal();
    axios.post(
      `${apiUrl}/workout/deleteworkoutlog`,
      {workoutId: workoutId},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    ).then((response) => {
        if (response.data.message == "Workout deleted successfully") {
          toast.success('Activity Log Deleted');
          setTimeout(() => {
            navigate('/dashboard/activity-log');
          }, 2000);
        }
      }
    ).catch((err) => {
      console.error('Error fetching data:', err);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/workout/getsingleworkoutlog`,
          {workoutid: workoutId},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setRoutine(response.data);
        const uniqueOrders = Array.from(
            new Set(response.data.allWorkouts.map(workout => workout.order))
        )
        .map(order => response.data.allWorkouts.find(workout => workout.order === order))
        .sort((a, b) => a.order - b.order);
        setExercises(uniqueOrders); 
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };
    fetchData(); 
  }, []);

  return (
    <>
      <div className="bg-white w-full rounded-lg mx-auto mt-4">
        <Toaster />
        <div className="pl-6 pt-6 divide-y md:divide-solid">
          <div className="w-full flex justify-between items-center ">
            <h3 className="text-lg">{routine?.routine?.title}</h3>
            <button className="flex items-center justify-center w-8 h-8 hover:bg-gray-300 text-gray-800 rounded-full"
              onClick={openModal}>
              <CiMenuKebab className="w-5 h-5" />
            </button>
            {isModalOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4">
                <NavLink to={`/dashboard/edit-activitylog/${workoutId}`} className="flex items-center space-x-2 hover:bg-[#F8C146]">
                  <FiEdit3 className="m-2" />
                  <span>Edit Activity</span>
                </NavLink>    
                <NavLink onClick={() => handledelete()} className="flex items-center space-x-2 hover:bg-[#F8C146]">
                <RiDeleteBin2Line className="m-2" />            
                  <span>Delete Activity</span>
                </NavLink>   
                  <button
                    className="bg-[#F8C146] px-3 py-1 rounded mt-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 modal">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Delete Activity Log</h2>
                    <p>Are you sure you want to delete this Activity Log?</p>
                    <div className="flex justify-end mt-4">
                      <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded mr-2">
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={confirmDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
            )}
          </div>
          {exercises.map((exercise, index) => (
            <ul key={index} role="list" className="divide-y divide-gray-100">
              <div>
                <div className="flex min-w-0 mt-2">
                  {exercise.bodypart}
                    <img alt="" src={exercise.exerciseDetails.img} className="size-20 flex-none rounded-full bg-gray-50" />
                </div>  
                <div className="min-w-0 flex-auto">
                  <p className="text-sm/6 font-semibold text-gray-900">{exercise.exerciseDetails.name}</p>
                  <p className="mt-1 truncate text-xs/5 text-gray-700">Rest Timer: {exercise.rest_timer}</p>
                  {exercise.type == 'ExerciseTypeOne' ?
                    <div>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Set</th>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Weight & Reps</th>
                          </tr>
                        </thead>
                        <tbody>
                          {routine.allWorkouts?.map((exercise1, index) => (
                            exercise1.order === exercise.order && (
                              <tr key={index} className="min-w-4">
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise1.set}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise1.kg} kg x {exercise1.reps} reps</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                    : null}
                  {exercise.type == 'ExerciseTypeTwo' ? 
                    <div>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Set</th>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Duration & Distance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {routine.allWorkouts?.map((exercise2, index) => (
                            exercise2.order === exercise.order && (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise2.set}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise2.time} min x {exercise2.km} km</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  : null}
                  {exercise.type == 'ExerciseTypeThree' ?
                    <div>
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Set</th>
                            <th className="px-4 py-2 text-sm text-gray-700 text-left">Reps</th>
                          </tr>
                        </thead>
                        <tbody>
                          {routine.allWorkouts?.map((exercise3, index) => (
                            exercise3.order === exercise.order && (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise3.set}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{exercise3.reps} reps </td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  : null}
                </div>
              </div>
            </ul>   
          ))}
        </div>
      </div>
    </>
  )
}

export default SingleActivity