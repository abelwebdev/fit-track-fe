/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { IoChevronDown } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

function TrackWorkout() {
  const token = localStorage.getItem('token'); 
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const { routineId } = useParams();
  const navigate = useNavigate();
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
  const logworkout = () => {
    const saveroutine = async () => {
      try {
        const response = await axios.post(`${apiUrl}/workout/trackroutineworkout`, {
          exercises: selectedExercises,
          restTimers: exercises,
          routineId: routineId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          }
        });
        if (response.status === 200 && response.data.message === 'Successfully Logged Workout') {
          toast.success("Workout logged successfully");
          setTimeout(() => {
            navigate('/dashboard/activity-log');
          }, 2000);
        }
      } catch (error) {
        if (error.response) {
          toast.error("Something Went Wrong, Please try again");
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    saveroutine();
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/routines/getroutineexercises`,
          {
            id: routineId,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setSelectedExercises(response.data);
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

  const handleTimerChanges = (exerciseIndex, rest_timer, exercise_id, exercise_type) => {
    if(exercise_type == 'exercise_one') {
      const newExercises = selectedExercises.ExerciseTypeOne.map((exercise) => ({
        ...exercise,
        rest_timer,
      }));
      setSelectedExercises((prevState) => ({
        ...prevState,
        ExerciseTypeOne: newExercises,
      }));
    } else if (exercise_type == 'exercise_two') {
      const newExercises = selectedExercises.ExerciseTypeTwo.map((exercise) => ({
        ...exercise,
        rest_timer,
      }));
      setSelectedExercises((prevState) => ({
        ...prevState,
        ExerciseTypeTwo: newExercises,
      }));
    } else if (exercise_type == 'exercise_three') {
      const newExercises = selectedExercises.ExerciseTypeThree.map((exercise) => ({
        ...exercise,
        rest_timer,
      }));
      setSelectedExercises((prevState) => ({
        ...prevState,
        ExerciseTypeThree: newExercises,
      }));
    };
  };
  const handleSetChanges = (index, set, exercise_id, exercise_type) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises }; // Create a shallow copy
      if (exercise_type === "exercise_one") {
        updatedExercises.ExerciseTypeOne = [...prevExercises.ExerciseTypeOne];
        updatedExercises.ExerciseTypeOne[index] = {
          ...updatedExercises.ExerciseTypeOne[index],
          set,
        };
      } else if (exercise_type === "exercise_two") {
        updatedExercises.ExerciseTypeTwo = [...prevExercises.ExerciseTypeTwo];
        updatedExercises.ExerciseTypeTwo[index] = {
          ...updatedExercises.ExerciseTypeTwo[index],
          set,
        };
      } else if (exercise_type === "exercise_three") {
        updatedExercises.ExerciseTypeThree = [...prevExercises.ExerciseTypeThree];
        updatedExercises.ExerciseTypeThree[index] = {
          ...updatedExercises.ExerciseTypeThree[index],
          set,
        };
      }
      return updatedExercises;
    });
  };
  const handlekgChanges = (index, kg, exercise_id, exercise_type) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises }; // Create a shallow copy
      if (exercise_type === "exercise_one") {
        updatedExercises.ExerciseTypeOne = [...prevExercises.ExerciseTypeOne];
        updatedExercises.ExerciseTypeOne[index] = {
          ...updatedExercises.ExerciseTypeOne[index],
          kg,
        };
      } else if (exercise_type === "exercise_two") {
        updatedExercises.ExerciseTypeTwo = [...prevExercises.ExerciseTypeTwo];
        updatedExercises.ExerciseTypeTwo[index] = {
          ...updatedExercises.ExerciseTypeTwo[index],
          kg,
        };
      } else if (exercise_type === "exercise_three") {
        updatedExercises.ExerciseTypeThree = [...prevExercises.ExerciseTypeThree];
        updatedExercises.ExerciseTypeThree[index] = {
          ...updatedExercises.ExerciseTypeThree[index],
          kg,
        };
      }
      return updatedExercises;
    });
  };
  const handlerepsChanges = (index, reps, exercise_id, exercise_type) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises }; // Create a shallow copy
      if (exercise_type === "exercise_one") {
        updatedExercises.ExerciseTypeOne = [...prevExercises.ExerciseTypeOne];
        updatedExercises.ExerciseTypeOne[index] = {
          ...updatedExercises.ExerciseTypeOne[index],
          reps,
        };
      } else if (exercise_type === "exercise_two") {
        updatedExercises.ExerciseTypeTwo = [...prevExercises.ExerciseTypeTwo];
        updatedExercises.ExerciseTypeTwo[index] = {
          ...updatedExercises.ExerciseTypeTwo[index],
          reps,
        };
      } else if (exercise_type === "exercise_three") {
        updatedExercises.ExerciseTypeThree = [...prevExercises.ExerciseTypeThree];
        updatedExercises.ExerciseTypeThree[index] = {
          ...updatedExercises.ExerciseTypeThree[index],
          reps,
        };
      }
      return updatedExercises;
    });
  };
  const handlekmchanges = (index, km, exercise_id, exercise_type) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises }; // Create a shallow copy
      if (exercise_type === "exercise_one") {
        updatedExercises.ExerciseTypeOne = [...prevExercises.ExerciseTypeOne];
        updatedExercises.ExerciseTypeOne[index] = {
          ...updatedExercises.ExerciseTypeOne[index],
          km,
        };
      } else if (exercise_type === "exercise_two") {
        updatedExercises.ExerciseTypeTwo = [...prevExercises.ExerciseTypeTwo];
        updatedExercises.ExerciseTypeTwo[index] = {
          ...updatedExercises.ExerciseTypeTwo[index],
          km,
        };
      } else if (exercise_type === "exercise_three") {
        updatedExercises.ExerciseTypeThree = [...prevExercises.ExerciseTypeThree];
        updatedExercises.ExerciseTypeThree[index] = {
          ...updatedExercises.ExerciseTypeThree[index],
          km,
        };
      }
      return updatedExercises;
    });
  };
  const handletimechanges = (index, time, exercise_id, exercise_type) => {
    setSelectedExercises((prevExercises) => {
      const updatedExercises = { ...prevExercises }; // Create a shallow copy
      if (exercise_type === "exercise_one") {
        updatedExercises.ExerciseTypeOne = [...prevExercises.ExerciseTypeOne];
        updatedExercises.ExerciseTypeOne[index] = {
          ...updatedExercises.ExerciseTypeOne[index],
          time,
        };
      } else if (exercise_type === "exercise_two") {
        updatedExercises.ExerciseTypeTwo = [...prevExercises.ExerciseTypeTwo];
        updatedExercises.ExerciseTypeTwo[index] = {
          ...updatedExercises.ExerciseTypeTwo[index],
          time,
        };
      } else if (exercise_type === "exercise_three") {
        updatedExercises.ExerciseTypeThree = [...prevExercises.ExerciseTypeThree];
        updatedExercises.ExerciseTypeThree[index] = {
          ...updatedExercises.ExerciseTypeThree[index],
          time,
        };
      }
      return updatedExercises;
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center max-w-full w-full gap-4 md:gap-6">
      <Toaster />
      <div className="w-full md:w-2/3 lg:w-2/3">
        {exercises?.length > 0 ? (
          <>
            {exercises.map((item, exerciseIndex) => (
              <div key={exerciseIndex} className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto mt-4">
                <div className="flex items-center justify-center p-6 py-6">
                  <div className="mx-auto w-full bg-white">
                    <form>
                      {item.ex1 ? (
                        <div>
                          <div className="w-full ">
                            <div className="mb-5 flex flex-row justify-between items-stretch">
                              <div className="flex flex-row items-start">
                                <img src={item.ex1?.exercise?.img || item.ex1?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                              </div>
                            </div>
                            <p className="my-2"> {item.ex1.name || item.ex1.exercise.name} </p>
                            <div className="sm:col-span-3">
                              <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                                Rest Timer:
                              </label>
                              <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                                <select 
                                  name={`rest-timer-${item.ex1?._id}`}
                                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                  defaultValue={item.ex1?.rest_timer}
                                  onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item.ex1?._id, 'exercise_one')}
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
                            <div className="flex flex-wrap mx-2">
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
                            {selectedExercises?.ExerciseTypeOne?.map((exercise, index) => (
                              <div key={index} className="flex flex-wrap -mx-2">
                                {exercise.exercise_id == item.ex1.exercise_id ?
                                  <>
                                    <div className="px-2 w-1/3">
                                      <div className="inline-block text-left">
                                        <div className="font-sans w-full mx-auto">
                                          <div className="mb-2 grid grid-cols-1">
                                            <select
                                              name="set-type"
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                              defaultValue={exercise.set}
                                              onChange={(e) => handleSetChanges(index, e.target.value, item.ex1.exercise_id, 'exercise_one')}
                                              >
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 hidden md:block"
                                            />
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
                                          onChange={(e) => handlekgChanges(index, e.target.value, item.ex1.exercise_id, 'exercise_one')}
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
                                          onChange={(e) => handlerepsChanges(index, e.target.value, item.ex1.exercise_id, 'exercise_one')}
                                        />
                                      </div>
                                    </div>
                                  </>
                                  : null  }
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : item.ex2 ? (
                        <div>
                          <div className="w-full">
                            <div className="mb-5 flex flex-row justify-between items-stretch">
                              <div className="flex flex-row items-start"> 
                                <img src={item.ex2?.exercise?.img || item.ex2?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                              </div>
                            </div>
                            <p className="my-2"> {item.ex2.name || item.ex2.exercise.name} </p>
                            <div className="sm:col-span-3">
                              <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                                Rest Timer:
                              </label>
                              <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                                <select 
                                  name={`rest-timer-${item.ex2?._id}`}
                                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                  defaultValue={item.ex2?.rest_timer}
                                  onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item.ex2?._id, 'exercise_two')}
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
                            {selectedExercises?.ExerciseTypeTwo?.map((exercise, index) => (
                              <div key={index} className="flex flex-wrap -mx-2">
                                { exercise.exercise_id == item.ex2.exercise_id ?
                                  <>
                                    <div className="px-2 w-1/3">
                                      <div className="inline-block text-left">
                                        <div className="font-sans w-full mx-auto">
                                          <div className="mb-2 grid grid-cols-1">
                                            <select
                                              name="set-type"
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6" 
                                              defaultValue={exercise.set}
                                              onChange={(e) => handleSetChanges(index, e.target.value, item.ex2.exercise_id, 'exercise_two')}>
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 hidden md:block"
                                            />
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
                                          onChange={(e) => handlekmchanges(index, e.target.value, item.ex2.exercise_id, 'exercise_two')}
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
                                          onChange={(e) => handletimechanges(index, e.target.value, item.ex2.exercise_id, 'exercise_two')}
                                        />
                                      </div>
                                    </div>
                                  </>
                                  : null  }
                              </div>
                            ))}
                        </div>
                      ) : item.ex3 ? (
                        <div>
                          <div className="w-full">
                            <div className="mb-5 flex flex-row justify-between items-stretch">
                              <div className="flex flex-row items-start"> 
                                <img src={item.ex3?.exercise?.img || item.ex3?.img} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                              </div>
                            </div>
                            <p className="my-2"> {item.ex3.name || item.ex3.exercise.name} </p>
                            <div className="sm:col-span-3">
                              <label htmlFor="resttimer" className="block text-sm/6 font-medium text-gray-900">
                                Rest Timer:
                              </label>
                              <div className="mt-2 mb-2 max-w-28 grid grid-cols-1">
                                <select 
                                  name={`rest-timer-${item.ex3?._id}`}
                                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                  defaultValue={item.ex3?.rest_timer}
                                  onChange={(e) => handleTimerChanges(exerciseIndex, e.target.value, item.ex3?._id, 'exercise_three')}

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
                          {selectedExercises?.ExerciseTypeThree?.map((exercise, index) => (
                              <div key={index} className="flex flex-wrap -mx-2">
                                { exercise.exercise_id == item.ex3.exercise_id ?
                                  <>
                                    <div className="px-2 w-1/3">
                                      <div className="inline-block text-left">
                                        <div className="font-sans w-full mx-auto">
                                          <div className="mb-2 max-w-28 grid grid-cols-1">
                                            <select
                                              name="set-type"
                                              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6" 
                                              defaultValue={exercise.set}
                                              onChange={(e) => handleSetChanges(index, e.target.value, item.ex3.exercise_id, 'exercise_three')}>
                                              {set_types.map((type, index) => (
                                                <option key={index} value={type}>
                                                  {type}
                                                </option>
                                              ))}
                                            </select>
                                            <IoChevronDown
                                              aria-hidden="true"
                                              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4 hidden md:block"
                                            />
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
                                          defaultValue={exercise.reps}
                                          onChange={(e) => handlerepsChanges(index, e.target.value, item.ex3.exercise_id, 'exercise_three')}
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
            <div>
              <button 
                className="button min-w-full py-2 my-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]"
                onClick={() => logworkout()}> Log Workout 
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen p-4">
            <img
              src="/fit-blend.png"
              alt="Logo"
              className="mb-4 w-16 h-16 md:w-16 md:h-16 lg:w-16 lg:h-16"
            />
            <p className="text-center text-gray-500 text-base md:text-lg lg:text-xl">
              Add Exercise to this routine
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TrackWorkout