import { useEffect, useState } from "react";
import axios from 'axios';
import { IoFitness } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const apiUrl = import.meta.env.VITE_API_URL;

function Feed() {
  const token = localStorage.getItem('token'); 
  const [user, setUser] = useState("");
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [muscles, setMuscles] = useState([]);
  const [dates, setDates] = useState([]);
  const [value, onChange] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);
  
  useEffect(() => {
    setHighlightedDates(dates);
  }, [dates]);
  const isHighlighted = (date) => {
    const dateString = date.toDateString();
    const highlighted = highlightedDates.some(
      (highlighted) => new Date(highlighted).toDateString() === dateString
    );
    return highlighted;
  };
  const getLastDayOfMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/feed/getfeed`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setUser(response.data.user);
        setTotalWorkouts(response.data.totalworkoutscount);
        setTotalDistance(response.data.totaldistance);
        setMuscles(response.data.muscleCount);
        const workout_dates = response.data.workout_dates.map(item => item.createdAt);
        setDates(workout_dates);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };
    fetchData(); 
  }, []);
  const data = {
    labels: [
      'abductors',
      'abs',
      'adductors',
      'bicpes',
      'calves',
      'delts',
      'forearms',
      'glutes',
      'hamstrings',
      'lats',
      'levator scapulae',
      'pectorals',
      'quads',
      'serratus anterior',
      'traps',
      'triceps',
      'upper back'
    ],
    datasets: [{
      data: [muscles[0]?.value ? muscles[0]?.value : 0, muscles[1]?.value ? muscles[1]?.value : 0,  muscles[2]?.value ? muscles[2]?.value : 0,  muscles[3]?.value ? muscles[3]?.value : 0,  muscles[4]?.value ? muscles[4]?.value : 0,  muscles[5]?.value ? muscles[5]?.value : 0,  muscles[6]?.value ? muscles[6]?.value : 0,  muscles[7]?.value ? muscles[7]?.value : 0, muscles[8]?.value ? muscles[8]?.value : 0,  muscles[9]?.value ? muscles[9]?.value : 0,  muscles[10]?.value ? muscles[10]?.value : 0,  muscles[11]?.value ? muscles[11]?.value : 0,  muscles[12]?.value ? muscles[12]?.value : 0,  muscles[13]?.value ? muscles[13]?.value : 0,  muscles[14]?.value ? muscles[14]?.value : 0,  muscles[15]?.value ? muscles[15]?.value : 0],
      backgroundColor: [
        'rgb(253, 174, 35)',
        'rgb(97, 128, 253)',
        'rgb(105, 218, 190)',
        'rgb(60, 148, 172)',
        'rgb(73, 78, 143)',
        'rgb(202, 200, 139)',
        'rgb(120, 71, 7)',
        'rgb(226, 35, 155)',
        'rgb(95, 178, 122)',
        'rgb(220, 99, 142)',
        'rgb(124, 99, 50)',
        'rgb(43, 218, 26)',
        'rgb(59, 236, 62)',
        'rgb(1, 148, 202)',
        'rgb(191, 70, 207)',
        'rgb(248, 38, 52)',
        'rgb(23, 2, 240)'
      ],
      hoverOffset: 10
    }]
  };

  return (
    <>
      <main id="page-content" className="flex max-w-full flex-auto flex-col">
        <div className="container mx-auto px-4 pt-6 lg:px-8 lg:pt-8 xl:max-w-7xl">
          <div
            className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-start"
          >
            <div className="grow">
              <h1 className="mb-1 text-xl font-bold">Welcome {user} </h1>
              <h2 className="text-sm font-medium text-slate-500">
                Keep Moving & Stay Healthy.
              </h2>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Left Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-4 flex-1">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="inline-block rounded-lg py-2 px-3">
                  <IoFitness className="h-12 w-12" style={{ color: "#F8C146" }}/>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800">Total Workouts</h3>
                  <p className="mt-2 text-lg text-gray-500">{totalWorkouts}</p>
                </div>
              </div>
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="inline-block rounded-lg py-2 px-3">
                  <GiPathDistance className="h-12 w-12" style={{ color: "#F8C146" }}/>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800">Total Distance</h3>
                  <p className="mt-2 text-sm text-gray-500">{totalDistance} KM</p>
                </div>
              </div>
            </div>
            {/* Right Section (Card) */}
            <div>
              <h2 className="text-l font-bold">Workout Dates</h2>
              <Calendar
                onChange={onChange}
                value={value}
                showNeighboringMonth={false}
                maxDate={getLastDayOfMonth()}
                tileClassName={({ date, view }) => {
                  if (view === 'month' && isHighlighted(date)) {
                    return 'text-orange-important bg-blue-500';
                  }
                }}
              />
            </div>
          </div>
        </div>
          {
            totalWorkouts === 0 ? 
              null : 
              <div className="container p-4 lg:p-8 xl:max-w-7xl">
                <h1 className="text-xl font-bold">Workout History</h1>
                <div className="w-full max-w-lg mx-auto">
                  <Doughnut data={data} className="" />
                </div>
              </div>
          }
      </main>
    </>
  )
}

export default Feed