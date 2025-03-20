import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from "react";
import axios from 'axios';
import { LuNotebookPen } from "react-icons/lu";
import { IoFolderOpenOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_URL;

function Routines() {
  const [routines, setRoutines] = useState([]);
  const [routineFolders, setRoutineFolders] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [selectedDropdownId, setSelectedDropdownId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const toggleDropdown = (folderId) => {
    setSelectedDropdownId((prevId) => (prevId === folderId ? null : folderId));
  };
  const handleRenameClick = (folderId) => {
    setSelectedFolderId(folderId);
    setIsRenameModalOpen(true);
  };
  const handleDeleteClick = (folderId) => {
    setSelectedFolderId(folderId);
    setIsDeleteModalOpen(true);
  };
  const handleRename = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/routines/renameFolder`,
        {folderId: selectedFolderId, folderName: newFolderName},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if(response.data.message == "Folder renamed successfully") {
        toast.success('Folder renamed successfully');
        navigate(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/routines/deletefolder`,
        {folderId: selectedFolderId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if(response.data.message == "Folder deleted successfully") {
        toast.success('Folder deleted successfully');
        navigate(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const closeModal = () => {
    setIsRenameModalOpen(false);
    setSelectedFolderId(null);
    setNewFolderName("");
  };
  const handleOutsideClick = (event) => {
    const isDropdownClick = event.target.closest('.dropdown-toggle');
    const isModalClick = event.target.closest('.modal');

    if (!isDropdownClick && selectedDropdownId) {
      setSelectedDropdownId(null);
    }
    if (!isModalClick && isRenameModalOpen) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedDropdownId]);
  const handleButtonClick = (event, folder_id) => {
    navigate('/dashboard/create-routine', { state: { folderId: folder_id } });
  };
  const handleFolderButtonClick = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/routines/createroutinefolder`,
        { foldername: folderName },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setIsOpen(false);
      setFolderName('');
      if (response.data.message === 'Folder created successfully') {
        toast.success('Folder created successfully');
      } else {
        toast.error('Failed to create folder');
      }
      navigate(0);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/routines/getroutines`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [apiUrl, token]);

  return (
    <div className="flex flex-col md:flex-row justify-center max-w-[1148px] w-full p-4 md:p-6 gap-4 md:gap-6">
      <Toaster />
      {/* Main Content */}
      <div className="bg-white shadow-md w-full max-w-sm rounded-lg font-sans overflow-hidden mx-auto mt-6 p-6 flex h-[40vh] flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">Routines</h3>
        
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full max-w-[240px] px-5 py-2.5 flex items-center justify-center rounded text-sm font-medium border border-gray-300 outline-none hover:bg-[#FFD966] active:bg-[#F8C146] transition"
        >
          <LuNotebookPen size="1.8em" className="mr-2" />
          New Routine
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full max-w-[240px] px-5 py-2.5 mt-3 flex items-center justify-center rounded text-sm font-medium border border-gray-300 outline-none hover:bg-[#FFD966] active:bg-[#F8C146] transition"
        >
          <IoFolderOpenOutline size="1.8em" className="mr-2" />
          New Folder
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Folder
              </h3>
              <button
                onClick={() => {setIsOpen(false); setFolderName('')}}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <input type="url" id="website_url" className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {setIsOpen(false); setFolderName('')}}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md 
                  ${
                    folderName.trim()
                      ? "bg-[#F8C146]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`} 
                  disabled={!folderName.trim()}
                  onClick={() => {handleFolderButtonClick()}}>
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="flex w-full md:w-1/2 lg:w-1/3 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6 mb-8 max-h-[90vh] overflow-y-auto">
        <div className="w-full max-w-sm rounded-lg font-sans mx-auto flex-1">
          <div className="py-3">
            <h3 className="text-lg font-semibold mb-4">My routines ({routines.length})</h3>
            <div>
              {routines.map((routine) => (
                <button
                  type="button"
                  key={routine._id}
                  onClick={() => navigate(`/dashboard/view-routine/${routine._id}`)}
                  className="w-full px-5 py-2.5 mt-3 flex items-center justify-center rounded text-sm tracking-wider font-medium border border-gray-300 outline-none hover:bg-[#FFD966] active:bg-[#F8C146]"
                >
                  {routine.title}
                </button>
              ))}
            </div>
          </div>

          {routineFolders?.length > 0 ? (
            routineFolders.map((folder) => (
              <div key={folder._id} className="mb-4">
                {/* Folder Header */}
                <div className="relative flex justify-between items-center  p-3 rounded-lg">
                  <h3 className="text-lg font-semibold">{folder.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(folder._id);
                    }}
                    className="flex items-center justify-center w-8 h-8 hover:bg-gray-300 text-gray-800 rounded-full focus:outline-none"
                  >
                    <CiMenuKebab className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {selectedDropdownId == folder._id && (
                    <div
                      className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                      onClick={(e) => e.stopPropagation()} // Prevent menu from closing when clicked
                    >
                      <ul className="py-2 text-gray-700">
                        <li
                          onClick={(e) => handleButtonClick(e, folder._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Create Routine
                        </li>
                        <li
                          onClick={() => handleRenameClick(folder._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Rename Folder
                        </li>
                        <li
                          onClick={() => handleDeleteClick(folder._id)}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete Folder
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Folder Routines */}
                <div className="mt-3">
                  {folder.routines.length > 0 ? (
                    folder.routines.map((routine) => (
                      <button
                        key={routine._id}
                        onClick={() => navigate(`/dashboard/view-routine/${routine._id}`)}
                        className="w-full px-5 py-2.5 mt-2 flex items-center justify-center rounded text-sm tracking-wider font-medium border border-gray-300 outline-none hover:bg-[#FFD966] active:bg-[#F8C146] transition"
                      >
                        {routine.title}
                      </button>
                    ))
                  ) : (
                    null
                  )}
                </div>
              </div>
            ))
          ) : (
            null
          )}

          {/* Rename Modal */}
          {isRenameModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Rename Folder</h2>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsRenameModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRename()}
                    disabled={!newFolderName.trim()} // Disable if input is empty or only spaces
                    className={`px-4 py-2 text-white rounded ${
                      newFolderName.trim()
                        ? "bg-[#F8C146] hover:bg-[#E8B036]"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Delete Folder</h2>
                <p className="mb-4">Are you sure you want to delete this folder? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Routines