import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import {  useState } from 'react';
import { IoIosFitness } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { FaPersonRunning } from "react-icons/fa6";
import { GiBiceps } from "react-icons/gi";
import { MdLogout } from "react-icons/md";


function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem("token");
    navigate("/");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
          <div id="sidebar-collapse-menu"
            className={`bg-white shadow-lg h-screen fixed top-0 left-0 lg:min-w-[250px] w-max max-lg:min-w-8 transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

            <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] mt-5">
              <NavLink to="/" className="outline-none">
                <img src="/logo.png" alt="logo" width="150px" />
              </NavLink>
            </div>
            <div className="py-6 px-6">
              <ul className="space-y-2">
                <li>
                  <div
                    onClick={() => navigate('/dashboard')}
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300"
                  >
                    <IoHome size="1.5em" className="mr-2"/>
                    <span>Feed</span>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate('/dashboard/exercises')}
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300"
                  >
                    <IoIosFitness size="2em" className="mr-2" />
                    <span>Exercises</span>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate('/dashboard/routines')}
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300"
                  >
                    <LuNotebookPen size="1.8em" className="mr-2"/>
                    <span>Routines</span>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate('/dashboard/track-workout')}
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300">
                    <FaPersonRunning size="1.8em" className="mr-2"/>
                    <span>Track Workout</span>
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate('/dashboard/activity-log')}
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300">
                    <GiBiceps size="1.8em" className="mr-2"/>
                    <span>Activity Log</span>
                  </div>
                </li>
                <li>
                  <div
                    className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#F8C146] rounded-md px-3 py-3 transition-all duration-300"
                    onClick={() => setOpen(true)}>
                    <MdLogout size="1.8em" className="mr-2"/>
                    <span> Log Out</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <button id="toggle-sidebar" onClick={toggleSidebar}
          className='lg:hidden w-8 h-8 fixed top-[26px] left-[10px] cursor-pointer bg-[#F8C146] flex items-center justify-center rounded-full outline-none transition-all duration-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-3 h-3" viewBox="0 0 55.752 55.752">
            <path
              d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
              data-original="#000000" />
          </svg>
        </button>
        <section className="main-content w-full px-8">
          <div className="my-10 px-2">
            <div className="">
              <Outlet />
            </div>
          </div>
        </section>
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-semibold text-gray-900">Confirm Logout</h2>
              <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={handleLogout}
                >
                  Confirm Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard