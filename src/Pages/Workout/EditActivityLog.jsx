/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoChevronDown } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

function EditActivityLog() {
  const token = localStorage.getItem('token'); 
  const [routine, setRoutine] = useState([]);
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [allExercises, setAllExercises] = useState({});
  const [updatedTimer, setUpdatedTimer] = useState([]);
  const [updatedSet, setUpdatedSet] = useState([]);
  const [updatedKg, setUpdatedKg] = useState([]);
  const [updatedReps, setUpdatedReps] = useState([]);
  const [updatedKm, setUpdatedKm] = useState([]);
  const [updatedTime, setUpdatedTime] = useState([]);

  const { workoutId } = useParams();
  const rest_timers = [
    'Off',
    '00:05',
    '00:10',
    '00:15',
    '00:20',
    '00:25',
    '00:30',
    '00:35',
    '00:40',
    '00:45',
    '00:50',
    '00:55',
    '01:00',
    '01:05',
    '01:10',
    '01:15',
    '01:20',
    '01:25',
    '01:30',
    '01:35',
    '01:40',
    '01:45',
    '01:50',
    '01:55',
    '02:00',
    '02:05',
    '02:10',
    '02:15',
    '02:20',
    '02:25',
    '02:30',
    '02:35',
    '02:40',
    '02:45',
    '02:50',
    '02:55',
    '03:00',
    '03:05',
    '03:10',
    '03:15',
    '03:20',
    '03:25',
    '03:30',
    '03:35',
    '03:40',
    '03:45',
    '03:50',
    '03:55',
    '04:00',
    '04:05',
    '04:10',
    '04:15',
    '04:20',
    '04:25',
    '04:30',
    '04:35',
    '04:40',
    '04:45',
    '04:50',
    '04:55',
    '05:00',
  ];
  const set_types = [
    "Warm up",
    "Normal",
    "Failure",
    "Drop",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = [{
      updatedTimer: updatedTimer,
      updatedSet: updatedSet,
      updatedKg: updatedKg,
      updatedReps: updatedReps,
      updatedKm: updatedKm,
      updatedTime: updatedTime,
    }];

    if (payload.length === 0) {
      console.warn("No data to send");
    } else {
      try {
        const response = await axios.post(
          `${apiUrl}/workout/editworkoutlog`,
          {
            workoutId: workoutId,
            payload: payload[0],
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        if (response.data.message === "Workout updated successfully") {
          toast.success('Activity log updated successfully');
          setUpdatedTimer({});
          setUpdatedSet({});
          setUpdatedKg({});
          setUpdatedReps({});
          setUpdatedKm({});
          setUpdatedTime({});
          navigate(`/dashboard/activity-log/${workoutId}`);
        } else {
          console.log("error: ", response.data);
          toast.error('Something went wrong please try again!');
        }
      } catch (e) {
        console.error('Error updating activity log', e);
        toast.error('Error updating activity log');
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/workout/getsingleworkoutlog`,
          {
            workoutid: workoutId,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setRoutine(response.data.routine);
        setAllExercises(response.data.allWorkouts);
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
  const handleTimerChanges = (exerciseIndex, value, exerciseId, type) => {
    setUpdatedTimer((prevChanges) => ({
      ...prevChanges,
      [`exercise-${exerciseIndex}`]: {
        ...prevChanges[`set-${exerciseIndex}`],
        rest_timer: value,
        exercise_id: exerciseId,
        type: type,
      },
    }));
  };
  const handleSetChanges = (index, exerciseIndex, value, exerciseId, type) => {
    setUpdatedSet((prevChanges) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      return {
        ...prevChanges,
        [exerciseKey]: {
          ...prevChanges[exerciseKey],
          [`set-${index}`]: value,
          exercise_id: exerciseId,
          type: type,
        },
      };
    });
  };
  const handlekgChanges = (index, exerciseIndex, value, exerciseId, type) => {
    setUpdatedKg((prevChanges) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      return {
        ...prevChanges,
        [exerciseKey]: {
          ...prevChanges[exerciseKey],
          [`set-${index}`]: value,
          exercise_id: exerciseId,
          type: type,
        },
      }
    });
  };
  const handlerepsChanges = (index, exerciseIndex, value, exerciseId, type) => {
    setUpdatedReps((prevChanges) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      return {
        ...prevChanges,
        [exerciseKey]: {
          ...prevChanges[exerciseKey],
          [`set-${index}`]: value,
          exercise_id: exerciseId,
          type: type,
        },
      }
    });
  };
  const handlekmChanges = (index, exerciseIndex, value, exerciseId, type) => {
    setUpdatedKm((prevChanges) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      return {
        ...prevChanges,
        [exerciseKey]: {
          ...prevChanges[exerciseKey],
          [`set-${index}`]: value,
          exercise_id: exerciseId,
          type: type,
        },
      }
    });
  };
  const handletimeChanges = (index, exerciseIndex, value, exerciseId, type) => {
    setUpdatedTime((prevChanges) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      return {
        ...prevChanges,
        [exerciseKey]: {
          ...prevChanges[exerciseKey],
          [`set-${index}`]: value,
          exercise_id: exerciseId,
          type: type,
        },
      }
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-[1148px] w-full gap-4 md:gap-6">
      <Toaster />
      {/* Main Content */}
      <div className="w-full md:w-2/3 lg:w-2/3 mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-base">Activity Log</label>
            <button onClick={handleSubmit} className="button py-2 px-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]">
              Update Activity
            </button>
          </div>
        </div>
        {exercises.map((item, exerciseIndex) => (
          <div key={exerciseIndex} className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto mt-4">
            <div className="flex items-center justify-center p-6 py-6">
              <div className="mx-auto w-full max-w-[850px] bg-white">
                <form>
                  {
                    item.type == 'ExerciseTypeOne' ? (
                      <div>
                        <div className="w-full ">
                          <div className="mb-5 flex flex-row justify-between items-stretch">
                            <div className="flex flex-row items-start">
                              <img src={item.exerciseDetails?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                            </div>
                          </div>
                          <p className="my-2"> {item.exerciseDetails.name} </p>
                          <div className="sm:col-span-3">
                            <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                              Rest Timer:
                            </label>
                            <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                              <select 
                                name={`rest-timer-${item?._id}`}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                defaultValue={item?.rest_timer}
                                onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item?._id, 'exercise_one')}
                              >
                                {rest_timers.map((timer, index) => (
                                  <option key={index} value={timer}>
                                    {timer}
                                  </option>
                                ))}
                              </select>
                              <IoChevronDown
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-wrap -mx-2">
                            <div className="px-2 w-1/3">
                              <label className="block text-gray-700 font-medium mb-2">
                                SET
                              </label>
                            </div>
                            <div className="px-2 w-1/3">
                              <label className="block text-gray-700 font-medium mb-2">
                                KG
                              </label>
                            </div>
                            <div className="px-2 w-1/3">
                              <label className="block text-gray-700 font-medium mb-2">
                                REPS
                              </label>
                            </div>
                          </div>
                          {allExercises?.map((exercise, index) => (
                            <div key={index} className="flex flex-wrap -mx-2">
                              {exercise.exercise_id == item.exercise_id ?
                                <>
                                  <div className="px-2 w-1/3">
                                    <div className=" inline-block text-left">
                                      <div className="font-sans w-full mx-auto">
                                        <div className="mb-2 grid grid-cols-1">
                                          <div className="w-full sm:w-auto">
                                            <select
                                              name="set-type"
                                              className="w-full sm:w-auto appearance-none rounded-md bg-white py-1 pl-2 pr-6 sm:pl-3 sm:pr-8 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966]"
                                              defaultValue={exercise.set}
                                              onChange={(e) =>
                                                handleSetChanges(
                                                  exercise.setIndex,
                                                  exerciseIndex,
                                                  e.target.value,
                                                  item.exercise_id,
                                                  'exercise_one'
                                                )
                                              }
                                            >
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-2 w-1/3">
                                    <div>
                                      <input
                                        type="number"
                                        min="1"
                                        className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                        defaultValue={exercise.kg}
                                        onChange={(e) => handlekgChanges(exercise.setIndex, exerciseIndex, e.target.value, item.exercise_id, 'exercise_one')}
                                      />
                                    </div>
                                  </div>
                                  <div className="px-2 w-1/3">
                                    <div>
                                      <input
                                        type="number"
                                        min="1"
                                        className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                        defaultValue={exercise.reps}
                                        onChange={(e) => handlerepsChanges(exercise.setIndex, exerciseIndex, e.target.value, item.exercise_id, 'exercise_one')}
                                      />
                                    </div>
                                  </div>
                                </>
                                : null  }
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : item.type == 'ExerciseTypeTwo' ? (
                      <div>
                        <div className="w-full">
                          <div className="mb-5 flex flex-row justify-between items-stretch">
                            <div className="flex flex-row items-start"> 
                              <img src={item.exerciseDetails?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                            </div>
                          </div>
                          <p className="my-2"> {item.exerciseDetails.name} </p>
                          <div className="sm:col-span-3">
                            <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                              Rest Timer:
                            </label>
                            <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                              <select 
                                name={`rest-timer-${item?._id}`}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                defaultValue={item?.rest_timer}
                                onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item._id, 'exercise_two')}
                              >
                                {rest_timers.map((timer, index) => (
                                  <option key={index} value={timer}>
                                    {timer}
                                  </option>
                                ))}
                              </select>
                              <IoChevronDown
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                          <div className="px-2 w-1/3">
                            <label className="block text-gray-700 font-medium mb-2">
                              SET
                            </label>
                          </div>
                          <div className="px-2 w-1/3">
                            <label className="block text-gray-700 font-medium mb-2">
                              KM
                            </label>
                          </div>
                          <div className="px-2 w-1/3">
                            <label className="block text-gray-700 font-medium mb-2">
                              TIME
                            </label>
                          </div>
                        </div>
                          {allExercises?.map((exercise, index) => (
                            <div key={index} className="flex flex-wrap -mx-2">
                              { exercise.exercise_id == item.exercise_id ?
                                <>
                                  <div className="px-2 w-1/3">
                                    <div className=" inline-block text-left">
                                      <div className="font-sans w-full mx-auto">
                                        <div className="mb-2 grid grid-cols-1">
                                          <div className=" w-full sm:w-auto">
                                            <select
                                              name="set-type"
                                              className="w-full sm:w-auto appearance-none rounded-md bg-white py-1 pl-2 pr-6 sm:pl-3 sm:pr-8 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966]"
                                              defaultValue={exercise.set}
                                              onChange={(e) =>
                                                handleSetChanges(
                                                  exercise.setIndex,
                                                  exerciseIndex,
                                                  e.target.value,
                                                  item.exercise_id,
                                                  'exercise_one'
                                                )
                                              }
                                            >
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-2 w-1/3">
                                    <div>
                                      <input
                                        type="number"
                                        min="1"
                                        className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                        defaultValue={exercise.km}
                                        onChange={(e) => handlekmChanges(exercise.setIndex, exerciseIndex, e.target.value, item.exercise_id, 'exercise_two')}
                                      />
                                    </div>
                                  </div>
                                  <div className="px-2 w-1/3">
                                    <div>
                                      <input
                                        type="number"
                                        min="1"
                                        className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                        defaultValue={exercise.time}
                                        onChange={(e) => handletimeChanges(exercise.setIndex, exerciseIndex, e.target.value, item.exercise_id, 'exercise_two')}
                                      />
                                    </div>
                                  </div>
                                </>
                                : null  }
                            </div>
                          ))}
                      </div>
                    ) : item.type == 'ExerciseTypeThree' ? (
                      <div>
                        <div className="w-full">
                          <div className="mb-5 flex flex-row justify-between items-stretch">
                            <div className="flex flex-row items-start"> 
                              <img src={item.exerciseDetails?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                            </div>
                          </div>
                          <p className="my-2"> {item.exerciseDetails.name} </p>
                          <div className="sm:col-span-3">
                            <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                              Rest Timer:
                            </label>
                            <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                              <select 
                                name={`rest-timer-${item._id}`}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                defaultValue={item?.rest_timer}
                                onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item._id, 'exercise_three')}
                              >
                                {rest_timers.map((timer, index) => (
                                  <option key={index} value={timer}>
                                    {timer}
                                  </option>
                                ))}
                              </select>
                              <IoChevronDown
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                          <div className="px-2 w-1/3">
                            <label className="block text-gray-700 font-medium mb-2">
                              SET
                            </label>
                          </div>
                          <div className="px-2 w-1/3">
                            <label className="block text-gray-700 font-medium mb-2">
                              REPS
                            </label>
                          </div>
                        </div>
                        {allExercises?.map((exercise, index) => (
                            <div key={index} className="flex flex-wrap -mx-2">
                              { exercise.exercise_id == item.exercise_id ?
                                <>
                                  <div className="px-2 w-1/3">
                                    <div className=" inline-block text-left">
                                      <div className="font-sans w-full mx-auto">
                                        <div className="mb-2 grid grid-cols-1">
                                          <div className="w-full sm:w-auto">
                                            <select
                                              name="set-type"
                                              className="w-full sm:w-auto appearance-none rounded-md bg-white py-1 pl-2 pr-6  sm:pl-3 sm:pr-8 text-sm sm:text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966]"
                                              defaultValue={exercise.set}
                                              onChange={(e) =>
                                                handleSetChanges(
                                                  exercise.setIndex,
                                                  exerciseIndex,
                                                  e.target.value,
                                                  item.exercise_id,
                                                  'exercise_one'
                                                )
                                              }
                                            >
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none absolute inset-y-0 right-0 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-2 w-1/3">
                                    <div>
                                      <input
                                        type="number"
                                        min="1"
                                        className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                        onChange={(e) => handlerepsChanges(exercise.setIndex, exerciseIndex, e.target.value, item.exercise_id, 'exercise_three')}
                                      />
                                    </div>
                                  </div>
                                </>
                                : null  }
                            </div>
                        ))}
                      </div>
                    ) : null 
                  }
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditActivityLog
