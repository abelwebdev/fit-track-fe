import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Register from './Pages/Register.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Exercises from './Pages/Exercises.jsx'
import Feed from './Pages/Feed.jsx'
import Exercise from './Pages/Exercise.jsx';
import Routines from './Pages/Routines/Routines.jsx'
import CreateRoutines from './Pages/Routines/CreateRoutines.jsx'
import ViewRoutine from './Pages/Routines/ViewRoutine.jsx'
import ViewTrackerRoutine from './Pages/Workout/ViewTrackerRoutines.jsx';
import TrackWorkout from './Pages/Workout/TrackWorkout.jsx';
import ActivityLog from './Pages/Workout/ActivityLog.jsx';
import SingleActivity from './Pages/Workout/SingleActivity.jsx';
import EditActivityLog from './Pages/Workout/EditActivityLog.jsx';
import Error from './Pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute element={<Dashboard />}/>,
    children: [
      {
        path: "feed",
        element: <Feed />
      },
      {
        index: true, // Default content for `/dashboard`
        element: <Feed />,
      },
      {
        path: "exercises", // This creates the `/dashboard/exercises` route
        element: <Exercises />,
        children: [
          {
            index: true,
            element: <Exercise />
          },
          {
            path: ":exerciseId",
            element: <Exercise />
          }
        ]
      },
      {
        path: "routines",
        element: <Routines />,
      },
      {
        path: 'create-routine',
        element: <CreateRoutines />
      },
      {
        path: 'view-routine/:routineId',
        element: <ViewRoutine />
      },
      {
        path: 'track-workout',
        element: <ViewTrackerRoutine />
      },
      {
        path: 'track-workout/:routineId',
        element: <TrackWorkout />
      },
      {
        path: 'activity-log',
        element: <ActivityLog />
      },
      {
        path: 'activity-log/:workoutId',
        element: <SingleActivity />
      },
      {
        path: 'edit-activitylog/:workoutId',
        element: <EditActivityLog />
      }
    ]
  },
    {
    path: '*', // Catch-all route for undefined paths
    element: <Error />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
