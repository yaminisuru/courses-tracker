// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchCourses from './components/SearchCourses';
import ProgressTracking from './components/ProgressTracking';
import SubscribedCourses from './components/SubscribedCourses';
import LearningPathTool from './components/LearningPathTool';
import TestSession from './pages/testsessioon';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<><LandingNavbar /><LandingPage /></>} />
            <Route path="/login" element={<><LandingNavbar /><Login /></>} />
            <Route path="/register" element={<><LandingNavbar /><Register /></>} />
            <Route path="/course-listing" element={<SearchCourses />} />
            <Route path="/progress-tracking" element={<ProgressTracking />} />
            <Route path="/subscribed-courses" element={<SubscribedCourses />} />
            <Route path="/learning-path" element={<LearningPathTool />} />
            <Route path ="/test-session" element={<TestSession/>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
