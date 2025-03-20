import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

function ViewRoutine() {
  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);
  const token = localStorage.getItem('token'); 
  const { routineId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/routines/viewroutine`,
          {routineId: routineId},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setRoutine(response.data);
        let count = 0;
        let ex1 = 0;
        let ex2 = 0;
        let ex3 = 0;
        count += response.data.ExerciseTypeOne.length;
        count += response.data.ExerciseTypeTwo.length;
        count += response.data.ExerciseTypeThree.length;
        ex1 = response.data.ExerciseTypeOne.length;
        ex2 = response.data.ExerciseTypeTwo.length;
        ex3 = response.data.ExerciseTypeThree.length;

        const newExercises = [];
        for (let i = 0; i <= count; i++) {
          for(let j = 0; j <= ex1-1; j++) { 
            if(ex1 && response.data.ExerciseTypeOne[j].order == i) {
              newExercises.push({"ex1":response.data.ExerciseTypeOne[j]});
              break;
            }
          }
          for(let k = 0; k <= ex2-1; k++) {
            if(ex2 && response.data.ExerciseTypeTwo[k].order == i) {
              newExercises.push({"ex2":response.data.ExerciseTypeTwo[k]});
              break;
            }
          } 
          for(let l = 0; l <= ex3-1; l++) {
            if(ex3 && response.data.ExerciseTypeThree[l].order == i) {
              newExercises.push({"ex3":response.data.ExerciseTypeThree[l]});
              break;
            }
          }
        }
        setExercises(newExercises);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };
    fetchData(); 
  }, []);
  const handledelete = () => {
    setShowModal(true); // Open modal when clicked
  };
  const confirmDelete = () => {
    axios.post(
      `${apiUrl}/routines/deleteroutine`,
      {routineId: routineId},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    ).then((response) => {
        if (response.data.message == "Routine deleted successfully") {
          toast.success('Routine Deleted');
          navigate('/dashboard/routines');
        }
      }
    ).catch((err) => {
      console.error('Error fetching data:', err);
    });
  };

  return (
    <>
      <div className="bg-white w-full rounded-lg mx-auto mt-4">
        <Toaster />
        <div className="p-6 divide-y md:divide-solid">
          <div className="w-full flex justify-between items-center ">
            <h3 className="text-lg">{routine?.routine?.title}</h3>
            <button className="flex items-center justify-center w-8 h-8 hover:bg-gray-300 text-gray-800 rounded-full"
              onClick={openModal}>
              <CiMenuKebab className="w-5 h-5" />
            </button>
            {isModalOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4">  
                <NavLink onClick={() => handledelete()} className="flex items-center space-x-2 hover:bg-[#F8C146]">
                <RiDeleteBin2Line className="m-2" />            
                  <span>Delete Routine</span>
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
                    <h2 className="text-lg font-semibold mb-4">Delete Routine</h2>
                    <p>Are you sure you want to delete this routine?</p>
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
              {exercise.ex1 ?
                <div className="flex min-w-0 gap-x-4">
                  <img alt="" src={exercise.ex1?.exercise?.img} className="size-20 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{exercise.ex1?.exercise?.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-700">Rest Timer: {exercise.ex1?.rest_timer}</p>
                    {routine.ExerciseTypeOne?.map((exercise1, index) => (
                      <div key={index}>
                        { exercise1.exercise_id == exercise.ex1.exercise_id ?
                          <>
                            <table className="mt-1 text-xs/4 text-gray-700 border-collapse w-1/3">
                              <tbody>
                                <tr>
                                  <td className=" px-1 w-1/3 text-left">
                                    Set: <span className="border">{exercise1.set}</span>
                                  </td>
                                  <td className=" px-1 w-1/3 text-left">
                                    Kg: <span className="border">{exercise1.kg}</span>
                                  </td>
                                  <td className=" px-1 w-1/3 text-left">
                                    Reps: <span className="border">{exercise1.reps}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </> : null 
                        }
                      </div>
                    ))}
                  </div>
                </div> : null
              }  
              {exercise.ex2 ? 
                <div className="flex min-w-0 gap-x-4">
                  <img alt="" src={exercise.ex2?.exercise?.img} className="size-20 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{exercise.ex2?.exercise?.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-700">Rest Timer: {exercise.ex2?.rest_timer}</p>
                    {routine.ExerciseTypeTwo?.map((exercise2, index) => (
                      <div key={index}>
                        { exercise2.exercise_id == exercise.ex2.exercise_id ?
                          <>
                          <table className="mt-1 text-xs/4 text-gray-700 border-collapse w-1/3">
                              <tbody>
                                <tr>
                                  <td className=" px-1 w-1/3 text-left">
                                    Set: <span className="border">{exercise2.set}</span>
                                  </td>
                                  <td className=" px-1 w-1/3 text-left">
                                    Time: <span className="border">{exercise2.time}</span>
                                  </td>
                                  <td className=" px-1 w-1/3 text-left">
                                    Km: <span className="border">{exercise2.km}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </> : null 
                        }
                      </div>
                    ))}
                  </div>
                </div> : null
              }
              {exercise.ex3 ?
                <div className="flex min-w-0 gap-x-4">
                  <img alt="" src={exercise.ex3?.exercise?.img} className="size-20 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{exercise.ex3?.exercise?.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-700">Rest Timer: {exercise.ex3?.rest_timer}</p>
                    {routine.ExerciseTypeThree?.map((exercise3, index) => (
                      <div key={index}>
                        { exercise3.exercise_id == exercise.ex3.exercise_id ?
                          <>
                            <table className="mt-1 text-xs/4 text-gray-700 border-collapse w-1/3">
                              <tbody>
                                <tr>
                                  <td className=" px-1 w-1/3 text-left">
                                    Set: <span className="border">{exercise3.set}</span>
                                  </td>
                                  <td className=" px-1 w-1/3 text-left">
                                    Reps: <span className="border">{exercise3.reps}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </> : null 
                        }
                      </div>
                    ))}
                  </div>
                </div> : null
              }
            </ul>   
          ))}
        </div>
      </div>
    </>
  )
}

export default ViewRoutine