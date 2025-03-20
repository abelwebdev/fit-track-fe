/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

function ActivityLog() {
  const token = localStorage.getItem('token'); 
  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/workout/getworkoutlog`,
          {
            
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        setRoutine(response.data?.workoutData);
      } catch (error) {
        console.error('Error fetching data:', error); 
      }
    };
    fetchData();
  }, []);
  const HumanReadableDate = ({ isoDate }) => {
    const formattedDate = new Date(isoDate).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return <span>{formattedDate}</span>;
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-lg font-serif">
        <h1 className="text-lg ml-4 font-medium"> Activity Log </h1>
        {routine.length > 0 ? (
          routine.map((item, index) => (
            <Link
              key={index}
              to={{
                pathname: `/dashboard/activity-log/${item[1]?._id}`,
              }}
              className="bg-gray-100 text-black border-l-8 border-[#F8C146] rounded-md px-3 py-2 w-full md:w-6/12 lg:w-9/12"
            >
              {item[0]?.title}
              <div className="text-gray-500 font-thin text-sm pt-1">
                <span>Date: <HumanReadableDate isoDate={item[1]?.createdAt} /> </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">No activity log found</div>
        )}

      </div>
    </>
  )
}

export default ActivityLog