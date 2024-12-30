import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogViewer from './components/LogViewer';
import Report from './components/Report';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    try {
      const response = await axios.post('http://localhost:3000/parse-oas', {
        oasUrl: 'https://petstore.swagger.io/v2/swagger.json',
      });
      console.log('Response:', response.data);

      // Navigate to logs after successful POST request
      navigate('/logs');
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-20">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
        Welcome to REST API Evaluator
      </h2>
      <p className="mt-6 text-gray-800 text-lg max-w-xl text-center">
        Analyze OpenAPI specifications with ease. Generate logs and reports to
        streamline your API workflows.
      </p>
      <button
        onClick={handleGetStartedClick}
        className="mt-8 inline-block bg-teal-600 text-white text-xl font-medium px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition-transform duration-300"
      >
        Get Started
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gradient-to-br from-white to-pink-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">REST API Evaluator</h1>
            <nav className="flex space-x-6">
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'hover:bg-cyan-500 hover:scale-105 duration-200'
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
                      ? 'bg-blue-700 text-white'
                      : 'hover:bg-cyan-500 hover:scale-105 duration-200'
                  }`
                }
              >
                Report
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8 flex-grow">
          <Routes>
            <Route path="/logs" element={<LogViewer />} />
            <Route path="/report" element={<Report />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p className="text-sm">
            &copy; 2024 <span className="font-bold">REST API Evaluator</span>. All rights reserved.
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
