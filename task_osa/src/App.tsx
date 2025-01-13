import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import LogViewer from "./components/LogViewer";
import Report from "./components/Report";

const Home: React.FC = () => {
  const [oasUrl, setOasUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    if (!oasUrl) {
      setError("Please enter a valid OAS URL.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`http://localhost:3000/parse-oas`, {
        oasUrl: oasUrl,
      });
      console.log("Response:", response.data);
      navigate("/logs");
    } catch (error) {
      console.error("Error making POST request:", error);
      setError("Failed to process the API. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-20 px-4 sm:px-8">
      <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 text-center">
        Welcome to REST API Evaluator
      </h2>
      <p className="mt-6 text-gray-800 text-base sm:text-lg max-w-xl text-center">
        Analyze OpenAPI specifications with ease. Generate logs and reports to
        streamline your API workflows.
      </p>

      <input
        type="text"
        value={oasUrl}
        onChange={(e) => setOasUrl(e.target.value)}
        placeholder="Enter OAS URL"
        className="mt-8 px-4 py-2 w-full sm:w-[36rem] border-2 border-teal-600 rounded-lg text-lg"
      />

      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium text-center">
          {error}
        </p>
      )}

      <button
        onClick={handleGetStartedClick}
        className="mt-8 inline-block bg-teal-600 text-white text-lg sm:text-xl font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition-transform duration-300"
      >
        Get Started
      </button>

      {loading && (
        <>
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-10"></div>
          <div className="fixed inset-0 flex flex-col items-center justify-center z-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-600 border-solid"></div>
            <p className="mt-4 text-white text-lg font-semibold">
              Processing the API...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gradient-to-br from-white to-pink-50 min-h-screen flex flex-col">
        <header className="sticky top-0 bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center">
            <NavLink
              to="/"
              className="text-2xl sm:text-3xl font-extrabold italic"
            >
              REST API Evaluator
            </NavLink>
            <nav className="flex flex-wrap space-x-2 sm:space-x-6 mt-2 sm:mt-0">
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "hover:bg-cyan-500 hover:scale-105 duration-200"
                  }`
                }
              >
                Logs
              </NavLink>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "hover:bg-cyan-500 hover:scale-105 duration-200"
                  }`
                }
              >
                Report
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 py-8 flex-grow">
          <Routes>
            <Route path="/logs" element={<LogViewer />} />
            <Route path="/report" element={<Report />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-white text-center py-6">
          <p className="text-xs sm:text-sm">
            &copy; 2024 <span className="font-bold">REST API Evaluator</span>.
            All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Powered by OpenAPI, React, and Tailwind CSS.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
