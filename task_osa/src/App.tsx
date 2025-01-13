
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogViewer from './components/LogViewer';
import Report from './components/Report';

const Home: React.FC = () => {
  const [oasUrl, setOasUrl] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    if (!oasUrl) return; 

    setLoading(true); 
    const apiUrl = import.meta.env.VITE_REACT_API_BACKEND_URLL;
    console.log(apiUrl);
    try {
    
      const response = await axios.post(`http://localhost:3000/parse-oas`, {
        oasUrl: oasUrl, 
      });
      console.log('Response:', response.data);

  
      navigate('/logs');
    } catch (error) {
      console.error('Error making POST request:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-20 relative">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">
        Welcome to REST API Evaluator
      </h2>
      <p className="mt-6 text-gray-800 text-lg max-w-xl text-center">
        Analyze OpenAPI specifications with ease. Generate logs and reports to
        streamline your API workflows.
      </p>

      {/* Input Field */}
      <input
        type="text"
        value={oasUrl}
        onChange={(e) => setOasUrl(e.target.value)}
        placeholder="Enter OAS URL"
        className="mt-8 px-6 py-3 w-96 border-2 border-teal-600 rounded-lg text-lg"
      />
      
      {/* Get Started Button */}
      <button
        onClick={handleGetStartedClick}
        className="mt-8 inline-block bg-teal-600 text-white text-xl font-medium px-8 py-4 rounded-lg shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition-transform duration-300"
      >
        Get Started
      </button>

      {/* Loader and Background Dim */}
      {loading && (
        <>
          <div className="fixed inset-0 bg-gray-800 opacity-50 z-10"></div> {/* Dimmed background */}
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div> {/* Loader */}
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
        {/* Header */}
        <header className="sticky top-0 bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">REST API Evaluator</h1>
            <nav className="flex space-x-6">
              <NavLink
                to="/logs"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-cyan-500 hover:scale-105 duration-200'}`
                }
              >
                Logs
              </NavLink>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm transition ${isActive ? 'bg-blue-700 text-white' : 'hover:bg-cyan-500 hover:scale-105 duration-200'}`
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
