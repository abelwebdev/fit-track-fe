import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  const features = [
    {
      title: "Extensive Exercise Library",
      description: "Access a wide range of exercises for every fitness goal.",
    },
    {
      title: "Muscle Engagement Visualizations",
      description: "See which muscles are targeted in each exercise.",
    },
    {
      title: "Animated GIFs Demonstrating Exercises",
      description: "Learn proper form with clear, visual demonstrations.",
    },
    {
      title: "Filter Exercises by Muscle Group",
      description: "Quickly find exercises that focus on specific areas.",
    },
    {
      title: "Filter Exercises by Equipment",
      description: "Choose exercises based on available equipment.",
    },
  ];
  
  return (
    <>
      <div className="w-full h-screen bg-no-repeat bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <header className="lg:px-16 px-4 flex flex-wrap items-center py-4">
          {/* Logo Section */}
          <div className="flex-1 flex justify-between items-center mix-blend-screen">
            <NavLink to="/">
              <img src="/logo.png" alt="logo" width="150px" />
            </NavLink>
          </div>
          {/* Hamburger Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="cursor-pointer md:hidden block focus:outline-none"
          >
            <svg
              className="fill-current text-[#F8C146]"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          {/* Offcanvas Menu */}
          <div
            className={`fixed top-0 left-0 h-full bg-gray-900 z-50 w-64 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="p-4">
            <a href="#">
              <img src="/logo.png" alt="logo" className="w-36" />
            </a>
              <nav>
                <ul className="mt-8 text-white">
                  {/* <li className="py-2 border-b border-gray-700">
                    <a href="#" className="block hover:text-[#F8C146] font-semibold text-[15px]">
                      Home
                    </a>
                  </li>
                  <li className="py-2 border-b border-gray-700">
                    <a href="#" className="block hover:text-[#F8C146] font-semibold text-[15px]">
                      Workout
                    </a>
                  </li>
                  <li className="py-2 border-b border-gray-700">
                    <a href="#" className="block hover:text-[#F8C146] font-semibold text-[15px]">
                      Meal Plan
                    </a>
                  </li> */}
                  <li className="py-2">
                    <Link to="/register">
                      <button className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#F8C146] border border-[#F8C146] hover:bg-[#F8C146] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
                        Sign up
                      </button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex md:items-center md:w-auto w-full" id="menu">
            <nav>
              <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
                {/* <li className="px-3">
                  <a href="#" className="hover:text-[#F8C146] text-[#ffffff] font-semibold block text-[15px]">
                    Home
                  </a>
                </li>
                <li className="px-3">
                  <a href="#" className="hover:text-[#F8C146] text-[#ffffff] font-semibold block text-[15px]">
                    Workout
                  </a>
                </li>
                <li className="px-3">
                  <a href="#" className="hover:text-[#F8C146] text-[#ffffff] font-semibold block text-[15px]">
                    Meal Plan
                  </a>
                </li> */}
                <li className="px-3">
                   <Link to="/register">
                      <button className="px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#F8C146] border border-[#F8C146] hover:bg-[#F8C146] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
                        Sign up
                      </button>
                    </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="w-[90%] mx-auto h-full flex items-center justify-between py-10">
            <div className="lg:w-fit">
                <div
                    className="sm:text-5xl xs:text-5xl text-left text-white font-montserrat font-extrabold uppercase">
                    <h1 className="md:pt-4">Achieve</h1>
                    <h1 className="md:pt-4">Your</h1>
                    <h1 className="md:pt-4 text-[#F8C146] rounded-sm px-1 shadow-sm ">Fitness Goals</h1>
                    <h1 className="md:pt-4">with Ease</h1>
                </div>
                <button onClick={() => navigate("/register")} className="md:mt-4 px-3.5 py-[7px] text-[15px] rounded font-semibold text-[#F8C146] border border-[#F8C146] hover:bg-[#F8C146] transition-all ease-in-out duration-300 bg-transparent hover:text-white">
                  Sign up
                </button>
            </div>
        </div>
        <div className="text-gray-800 px-8 w-full rounded-lg font-[sans-serif] max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center">Your inteligent workout tracker</h1>
          <p className="my-4 text-sm text-center text-gray-600">Take control of your fitness journey with FitTrack! Explore a comprehensive library of exercises with step-by-step instructions, create custom workout routines that match your goals, and effortlessly log your progress as you train.</p>
        </div>

        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          <div className="sm:w-1/2 px-10">
            <div className="text">
              <h2 className="mt-4 font-bold text-3xl sm:text-4xl ">Exercise <span className="text-[#F8C146]">Database</span>
              </h2>
              <p className="text-gray-700">
                Discover a vast library of over 1,300 exercises designed for all fitness levels and training goals. From strength training and cardio to flexibility and mobility exercises, our database includes detailed instructions, muscle group targeting and variations. 
                <ul className="space-y-4 mt-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      {/* Left-aligned checkmark */}
                      <TiTick className="text-[#F8C146] w-6 h-6 flex-shrink-0" />
                      {/* Right-aligned text */}
                      <div className="flex-1">
                        <p className="font-semibold">{feature.title}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="image object-center text-center">
              <img src="/exercise_db.png" />
            </div>
          </div>
        </div>

        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          <div className="sm:w-1/2 p-5">
            <div className="image object-center text-center">
              <img src="/create_routine.png" />
            </div>
          </div>
          <div className="sm:w-1/2 px-10">
            <div className="text">
              <h2 className="mt-4 font-bold text-3xl sm:text-4xl ">Workout <span className="text-[#F8C146]">Routine</span>
              </h2>
              <p className="text-gray-700">
                Create your routine by selecting exercises that target specific muscle groups, adjusting sets, weights, reps or distance and time based on your goals.
              </p>
            </div>
          </div>
        </div>

        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          <div className="sm:w-1/2 px-10">
            <div className="text">
              <h2 className="mt-4 font-bold text-3xl sm:text-4xl ">Workout <span className="text-[#F8C146]">Log</span>
              </h2>
              <p className="text-gray-700">
                Log your workouts seamlessly from your routine, tracking sets, weights, reps or distance and time, and completed exercises to measure progress and make informed adjustments as you go.
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <div className="image object-center text-center">
              <img src="log_workout.png" />
            </div>
          </div>
        </div>

        <div className="sm:flex items-center max-w-screen-xl mx-auto">
          <div className="sm:w-1/2 p-5">
            <div className="image object-center text-center">
              <img src="dashboard.png" />
            </div>
          </div>
          <div className="sm:w-1/2 px-10">
            <div className="text">
              <h2 className="mt-4 font-bold text-3xl sm:text-4xl ">Dashboard <span className="text-[#F8C146]">View</span>
              </h2>
              <p className="text-gray-700">
                Stay on top of your fitness journey with a clear overview of your workout history. See your recent workout dates at a glance and track which muscle groups you&apos;ve trained to ensure balanced progress. Monitor trends, stay consistent, and keep pushing toward your goals! 
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <main className="flex-1"></main> {/* This ensures the footer stays at the bottom */}
          <footer className="bg-gray-800 text-white py-4 px-4 w-full mt-auto">
            <div className="container mx-auto text-center">
              <p className="inline-flex items-center gap-1">
                Track Fit, Made with <FaHeart className="text-[#F8C146]" /> by  
                <NavLink 
                  to="http://abelwebdev.netlify.app" 
                  className="text-white hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  me
                </NavLink>

              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App