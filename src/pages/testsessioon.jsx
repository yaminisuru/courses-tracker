// src/pages/TestSession.jsx
import React, { useEffect } from 'react';
import supabase from '../utils/supabaseClient';

const TestSession = () => {
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching session:', error);
        } else {
          console.log('Session:', session);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSession();
  }, []);

  return <div>Check the console for session details.</div>;
};

export default TestSession;
