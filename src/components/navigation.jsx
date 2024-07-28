import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import '../styles/navigation.css';

const Navigation = ({ filter }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          setSessionActive(false);
        } else {
          setSessionActive(true);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setSessionActive(false);
      }
    };

    checkSession();

    // Set an interval to check session status every minute
    const intervalId = setInterval(checkSession, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSearchParams({ filter: newFilter });
    navigate(`/subscribed-courses?filter=${newFilter}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src='/logo.jpg' alt="SLP Logo" className="logo-image" />
        </div>
        <Link to="/course-listing">Course List</Link>
        <Link to="/progress-tracking">Progress Tracking</Link>
        <Link to="/learning-path">Learning Path</Link>
        <div className="dropdown-container">
          <select value={filter} onChange={handleFilterChange} className="filter-dropdown">
            <option value="subscribed">Subscribed Courses</option>
            <option value="in-progress">In-Progress Courses</option>
            <option value="finished">Finished Courses</option>
          </select>
        </div>
      </div>
      <div className="navbar-right">
        <div className={`session-indicator ${sessionActive ? 'active' : 'expired'}`} />
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
