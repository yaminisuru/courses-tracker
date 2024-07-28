import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import '../styles/landingnavigation.css'; // Ensure this CSS file is updated as well

function LandingNavbar() {
  const [sessionActive, setSessionActive] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src='/logo.jpg' alt="SLP Logo" className="logo-image" />
      </div>
      <div className="navbar-links">
         <div className={`session-indicator ${sessionActive ? 'active' : 'expired'}`} />
        <Link to="/login" className="nav-button">Login</Link>
        <Link to="/register" className="nav-button">Register</Link>
      </div>
    </div>
  );
}

export default LandingNavbar;
