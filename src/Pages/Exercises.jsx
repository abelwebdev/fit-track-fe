/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import axios from 'axios';
import { IoSearch, IoCloseOutline} from "react-icons/io5";
const apiUrl = import.meta.env.VITE_API_URL;


function Exercises() {
  const token = localStorage.getItem('token'); 
  const [allExercises, setAllExercises] = useState([]);
  const navigate = useNavigate();
  const [paginationInfo, setPaginationInfo] = useState({
    total: 0,
    page: 1,
    limit: 100,
    totalPages: 14,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

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
  ]
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
  ]

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
  const handleNavigate = (item) => {
    // Navigate to a specific route (e.g., /exercise/:id)
    navigate(`/dashboard/exercises/${item}`);
  };
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

  return (
    <div className="flex flex-col md:flex-row justify-center max-w-[1148px] w-full p-4 md:p-6 gap-4 md:gap-6">
      {/* Main Content */}
      <div className="w-full md:w-2/3 lg:w-3/4">
      <h1 className="font-sans text-2xl	font-medium	pb-3"> Exercise </h1>
        <Outlet />
      </div>
      {/* Sidebar */}
      <div className="relative flex w-full md:w-1/3 lg:w-1/4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      
        <div className="p-4 md:p-6">
          <div className="space-y-6">
            {/* Dropdown for Muscles */}
            <div>
              <select
                id="dropdown1"
                name="dropdown1"
                value={selectedMuscle}
                onChange={handleMuscleChange}
                className=" border-2  pr-12  transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#F8C146] focus:border-[#F8C146] focus:shadow-outline"
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
                className=" border-2  pr-12  transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#F8C146] focus:border-[#F8C146] focus:shadow-outline"
              >
                {equipments.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Search Input Section */}
            <div className="relative">
              <input
                className="appearance-none border-2 pl-8 pr-12   transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-[#F8C146] focus:border-[#F8C146] focus:shadow-outline"
                id="exercise"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
              />
              <div className="absolute left-3 inset-y-0 flex items-center text-gray-500">
                <IoSearch />
              </div>
              <div
                className="absolute right-3 inset-y-0 flex items-center text-gray-500 cursor-pointer"
                onClick={clearInput}
              >
                <IoCloseOutline />
              </div>
            </div>
          </div>

          {/* Scrollable List */}
          <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-200">
            {allExercises?.length > 0 ? (allExercises.slice(0, 100).map((item, index) => (
              <NavLink key={index} to={`/dashboard/exercises/${item.exercise_id}`}>
                <div
                  onClick={() => handleNavigate(item.exercise_id)}
                  className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                >
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item.img}
                      alt="exercise url"
                      className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
                    />
                    <div>
                      <h6 className="block font-sans text-gray-900 antialiased">
                        {item.name}
                      </h6>
                      <p className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased">
                        {item.target}
                      </p>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))): (
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

export default Exercises;