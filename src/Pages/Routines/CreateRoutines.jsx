/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoSearch, IoCloseOutline, IoAdd, IoChevronDown } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { CiMenuKebab } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const apiUrl = import.meta.env.VITE_API_URL;

function CreateRoutines() {
  const token = localStorage.getItem('token'); 
  const location = useLocation();
  const { folderId } = location.state || {};
  const [allExercises, setAllExercises] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 100,
    totalPages: 14,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate();
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (e, index) => {
    e.preventDefault();
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleremoveexercise = (e, index) => {
    e.preventDefault();
    toggleMenu(e, index);
    setSelectedExercises((prev) => prev.filter((_, i) => i !== index));
    setFormData((prevData) => {
      const exerciseKey = `exercise-${index}`;
      // Create a copy of the previous form data without the specified exercise
      const { [exerciseKey]: removedExercise, ...updatedFormData } = prevData;
      // Rearrange the indices of the remaining exercises
      const rearrangedFormData = Object.keys(updatedFormData).reduce((acc, key, i) => {
        const newKey = `exercise-${i}`;
        acc[newKey] = { ...updatedFormData[key], order: i };
        return acc;
      }, {});
      return rearrangedFormData;
    });
      // Remove the sets associated with the removed exercise
      setInputSets((prevSets) => {
        const newSets = [...prevSets];
        newSets.splice(index, 1); // Remove the sets at the specified index
        return newSets;
      });
  };

  const handleAddToSelected = (item) => {
    setSelectedExercises((prev) => [...prev, item]);
  };
  const target_muscle = [
    'All Muscles',
    'abductors',
    'abs',
    'adductors',
    'biceps',
    'calves',
    'cardiovascular system',
    'delts',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'levator scapulae',
    'pectorals',
    'quads',
    'serratus anterior',
    'spine',
    'traps',
    'triceps',
    'upper back'
  ];
  const equipments = [
    'All Equipments',
    'assisted',
    'band',
    'barbell',
    'body weight',
    'bosu ball',
    'cable',
    'dumbbell',         
    'elliptical machine',
    'ez barbell',       
    'hammer',
    'kettlebell',       
    'leverage machine',
    'medicine ball',    
    'olympic barbell',
    'resistance band',  
    'roller',
    'rope',             
    'skierg machine',
    'sled machine',     
    'smith machine',
    'stability ball',   
    'stationary bike',
    'stepmill machine', 
    'tire',
    'trap bar',         
    'upper body ergometer',
    'weighted',         
    'wheel roller'
  ];
  const equipment1 = [
    'barbell',
    'cable',
    'dumbbell',         
    'ez barbell',       
    'kettlebell',       
    'leverage machine',
    'olympic barbell',
    'sled machine',     
    'smith machine',
    'trap bar',         
    'weighted',         
  ];
  const equipment2 = [       
    'elliptical machine',            
    'stationary bike',
    'stepmill machine',       
    'upper body ergometer',
  ];
  const equipment3 = [
    'assisted',
    'band',
    'body weight',
    'bosu ball',
    'hammer',
    'medicine ball',    
    'resistance band',  
    'roller',
    'rope',
    'skierg machine',
    'stability ball', 
    'tire',  
    'wheel roller'
  ];
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
  const handleInputChange = (e) => setSearchQuery(e.target.value)
  const clearInput = () => setSearchQuery("");
  const [selectedMuscle, setSelectedMuscle] = useState('All Muscles');
  const [selectedEquipment, setSelectedEquipment] = useState('All Equipments');
  const handleMuscleChange = (e) => {
    const { value } = e.target;
    setSelectedMuscle(value);
  };
  const handleEquipmentChange = (e) => {
    const { value } = e.target;
    setSelectedEquipment(value);
  };
  // Function to fetch exercises
  const GetAllExercises = async (page = 1, limit = 100) => {
    if (loading) return; // Prevent making multiple requests if already loading
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/exercises/getallexercises`, {
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status}`);
      }
      // Update exercises and pagination info
      setAllExercises(response.data.data);
      setPaginationInfo({
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch data when the component mounts or when the page changes
  useEffect(() => {
    GetAllExercises(paginationInfo.page, paginationInfo.limit);
  }, [paginationInfo.page]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/exercises/getfilteredexercises`,
          {
            query: searchQuery,
            muscle: selectedMuscle,
            equipment: selectedEquipment
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setAllExercises(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchQuery || selectedMuscle || selectedEquipment) {
      fetchData();
    }
  }, [searchQuery, selectedMuscle, selectedEquipment]);
  const shouldShowPagination = selectedMuscle === 'All Muscles' && selectedEquipment === 'All Equipments' && searchQuery === '';
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      toast.error("Add exercises and set to the routine");
      return;
    } else if (routineTitle === "") {
      toast.error("Routine title is required");
      return;
    }
    const saveroutine = async () => {
      try {
        const response = await axios.post(`${apiUrl}/routines/addroutines`, {
          title: routineTitle,
          exercises: formData,
          restTimers: restTimers,
          folderId: folderId
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          }
        });
        if (response.status === 200 && response.data.message === 'Successfully created Routine') {
          navigate('/dashboard/routines');
          toast.success("Routine added successfully");
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
  };
  const [inputSets, setInputSets] = useState([]);
  const [formData, setFormData] = useState({});
  const [routineTitle, setRoutineTitle] = useState(""); // State to store the input value
  const handleTitleChange = (e) => {
    setRoutineTitle(e.target.value); // Update state on input change
  };
  const handleInputChanges = (exerciseIndex, setIndex, field, value, id, type) => {
    setFormData((prevData) => {
      const exerciseKey = `exercise-${exerciseIndex}`;
      const setKey = `set-${setIndex}`;
      const exerciseId = `exerciseId`;

      // Create a copy of the previous set data
      const updatedSet = {
        ...prevData[exerciseKey]?.[setKey],
        [field]: value,
      };

      // If the field is 'setType', ensure it's updated correctly
      if (field === 'setType') {
        updatedSet.setType = value;
      } else {
        // Ensure default value for unselected sets
        updatedSet.setType = updatedSet.setType || "Warmup";
      }

      return {
        ...prevData,
        [exerciseKey]: {
          ...prevData[exerciseKey],
          [setKey]: updatedSet,
          [exerciseId]: {
            ...prevData[id],
            id: id,
          },
          order: exerciseIndex,
          type: type,
        },
      };
    });
  };
  const handleAddSet = (exerciseIndex) => {
    setInputSets((prevSets) => {
      const newSets = [...prevSets];
      newSets[exerciseIndex] = [...(newSets[exerciseIndex] || []), {}];
      return newSets;
    });
  };
  const [restTimers, setRestTimers] = useState({}); // State to store rest-timer for each exercise
  const updateRestTimer = (exerciseId, value) => {
    setRestTimers((prev) => ({
      ...prev,
      [exerciseId]: value, // Update rest-timer for the specific exercise
    }));
  };
  return (
    <div className="flex flex-col md:flex-row justify-between max-w-[1148px] w-full gap-4 md:gap-6">
      <Toaster />
      {/* Main Content */}
      <div className="w-full md:w-2/3 lg:w-2/3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-base">Routine Title</label>
            <button onClick={handleSubmit} className="button py-2 px-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]">
              Save Routine
            </button>
          </div>
          <input type="text" placeholder="Routine Title" className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-[#F8C146]" 
          value={routineTitle} onChange={handleTitleChange} />
        </div>
        {selectedExercises?.length > 0 ? (
          selectedExercises.map((item, exerciseIndex) => (
            <div key={exerciseIndex} className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full rounded-lg overflow-hidden mx-auto mt-4">
              <div className="flex items-center justify-center p-6 py-6">
                <div className="mx-auto w-full max-w-[850px] bg-white">
                  <form>
                      <div className="min-w-full sm:w-1/2">
                        <div className="mb-5 flex flex-row justify-between items-stretch">
                          <div className="flex flex-row items-start">
                            <img src={item.gifurl} alt="exercise url" className="h-24 w-24 mr-3 rounded-full object-cover object-center" />
                            <div className="text-lg md:text-md self-center">
                              {item.name}
                            </div>
                          </div>
                          <div className="relative">
                            <button onClick={(e) => toggleMenu(e, exerciseIndex)} className="focus:outline-none">
                              <CiMenuKebab />
                            </button>
                            {openMenuIndex === exerciseIndex && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                  <button className="flex items-center px-5 py-2 my-1 hover:bg-gray-200 focus:outline-[#F8C146]"
                                    onClick={(e) => handleremoveexercise(e, exerciseIndex)}>
                                    <span className="mr-2">
                                      <IoClose />
                                    </span>
                                    Remove Exercise
                                  </button>                               
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor={`rest-timer-${item._id}`}
                            className="block text-sm font-medium text-gray-900"
                          >
                            Rest Timer:
                          </label>
                          <div className="flex items-center mt-2 mb-2 max-w-xs">
                            <select
                              id={`rest-timer-${item._id}`}
                              name={`rest-timer-${item._id}`}
                              className="flex-grow appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-[#FFD966] sm:text-sm"
                              onChange={(e) => updateRestTimer(item._id, e.target.value)}
                            >
                              {rest_timers.map((timer, index) => (
                                <option key={index} value={timer}>
                                  {timer}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {equipment1.includes(item.equipment) ? (
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
                          {(inputSets[exerciseIndex] || []).map((inputSet, setIndex) => (
                            <div key={setIndex} className="flex flex-wrap -mx-2">
                              <div className="px-2 w-1/3">
                                <div className="inline-block text-left">
                                  <div className="font-sans w-full mx-auto">
                                    <div className="mb-2 grid grid-cols-1">
                                      <select
                                        name="set-type"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6" 
                                        defaultValue={set_types[0]}
                                        onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'setType', e.target.value, item._id, 'set_type_1')}>
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
                                    onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'kg', e.target.value, item._id, 'set_type_1')}
                                  />
                                </div>
                              </div>
                              <div className="px-2 w-1/3">
                                <div>
                                  <input
                                    type="number"
                                    min="1"
                                    className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                    onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'reps', e.target.value, item._id, 'set_type_1')}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="w-full">
                            <button
                              type="button"
                              className="button min-w-full py-2 my-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]"
                              onClick={() => handleAddSet(exerciseIndex)}
                            >
                              Add Set
                            </button>
                          </div>
                        </div>
                      ) : equipment2.includes(item.equipment) ? (
                        <div>
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
                          {(inputSets[exerciseIndex] || []).map((inputSet, setIndex) => (
                            <div key={setIndex} className="flex flex-wrap -mx-2">
                              <div className="px-2 w-1/3">
                                <div className="inline-block text-left">
                                  <div className="font-sans w-full mx-auto">
                                    <div className="mb-2 grid grid-cols-1">
                                      <select
                                        name="set-type"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                        defaultValue={set_types[0]}
                                        onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'setType', e.target.value, item._id, 'set_type_2')}
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
                                    onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'km', e.target.value, item._id, 'set_type_2')}
                                  />
                                </div>
                              </div>
                              <div className="px-2 w-1/3">
                                <div>
                                  <input
                                    type="number"
                                    min="1"
                                    className="sm:px-2 sm:py-1.5 px-1 py-1 rounded-md sm:text-sm text-xs text-black bg-white border border-gray-400 focus:outline-[#FFD966] sm:w-auto w-full"
                                    onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'time', e.target.value, item._id, 'set_type_2')}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="w-full">
                            <button
                              type="button"
                              className="button min-w-full py-2 my-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]"
                              onClick={() => handleAddSet(exerciseIndex)}
                            >
                              Add Set
                            </button>
                          </div>
                        </div>
                      ) : equipment3.includes(item.equipment) ? (
                        <div>
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
                          {(inputSets[exerciseIndex] || []).map((inputSet, setIndex) => (
                            <div key={setIndex} className="flex flex-wrap -mx-2">
                              <div className="px-2 w-1/3">
                                <div className="inline-block text-left">
                                  <div className="font-sans w-full mx-auto">
                                    <div className="mb-2 grid grid-cols-1">
                                      <select
                                        name="set-type"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#FFD966] sm:text-sm/6"
                                        defaultValue={set_types[0]}
                                        onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'setType', e.target.value, item._id, 'set_type_3')}
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
                                    onChange={(e) => handleInputChanges(exerciseIndex, setIndex, 'reps', e.target.value, item._id, 'set_type_3')}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="w-full">
                            <button
                              type="button"
                              className="button min-w-full py-2 my-4 border rounded-md bg-white focus:outline-[#FFD966] hover:bg-[#FFD966]"
                              onClick={() => handleAddSet(exerciseIndex)}
                            >
                              Add Set
                            </button>
                          </div>
                        </div>
                      ) : null
                      }
                  </form>
                </div>
              </div>
            </div>
          ))
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
      {/* Sidebar */}
      <div className="flex w-full max-h-screen md:w-1/3 lg:w-1/3 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Dropdown for Muscles */}
            <div>
              <select
                id="dropdown1"
                name="dropdown1"
                value={selectedMuscle}
                onChange={handleMuscleChange}
                className="border-2 pr-12 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#F8C146] focus:border-[#F8C146] focus:shadow-outline"
                defaultValue={set_types[0]}
              >
                {target_muscle.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {/* Dropdown for Equipment */}
            <div>
              <select
                id="dropdown2"
                name="dropdown2"
                value={selectedEquipment}
                onChange={handleEquipmentChange}
                className="border-2 pr-12 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#F8C146] focus:border-[#F8C146] focus:shadow-outline"
              >
                {equipments.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
            {/* Search Input Section */}
            <div className="flex items-center border-2 rounded-md focus-within:ring-[#F8C146] focus-within:border-[#F8C146]">
              <div className="flex items-center pl-3 text-gray-500">
                <IoSearch />
              </div>
              <input
                className="appearance-none w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
                id="exercise"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              <div
                className="flex items-center pr-3 text-gray-500 cursor-pointer"
                onClick={clearInput}
              >
                <IoCloseOutline />
              </div>
            </div>
          </div>
          {/* Scrollable List */}
          <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-200">
            {allExercises?.length > 0 ? (
              allExercises.slice(0, 100).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                >
                  <div
                    className="flex items-center gap-x-3 w-full min-h-16 hover:bg-gray-100 hover:shadow-md rounded-md transition"
                    onClick={() => handleAddToSelected(item)}
                  >
                    {/* Plus sign container */}
                    <div className="flex items-center justify-left h-12 w-12">
                      <IoAdd className="h-6 w-6 text-gray-600" />
                    </div>
                    {/* Exercise image */}
                    <img
                      src={item.img}
                      alt="exercise url"
                      className="h-12 w-12 rounded-full object-cover object-center"
                    />
                    {/* Exercise details */}
                    <div className="flex flex-col justify-center">
                      <h6 className="font-sans text-gray-900 antialiased">
                        {item.name}
                      </h6>
                      <p className="font-sans text-sm font-light leading-normal text-gray-700 antialiased">
                        {item.target}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No exercises found.</p>
            )}
          </div>
          {/* Pagination Controls */}
          {shouldShowPagination && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => GetAllExercises(paginationInfo.page - 1, paginationInfo.limit)}
                disabled={paginationInfo.page <= 1}
                className={`px-4 py-2 rounded-md text-white ${
                  paginationInfo.page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Previous
              </button>
              <span className="text-sm font-medium">
                {paginationInfo.page}
              </span>
              <button
                onClick={() => GetAllExercises(paginationInfo.page + 1, paginationInfo.limit)}
                disabled={paginationInfo.page >= paginationInfo.totalPages}
                className={`px-4 py-2 rounded-md text-white ${
                  paginationInfo.page >= paginationInfo.totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateRoutines