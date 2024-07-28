import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import { ProgressBar, Button, Form } from 'react-bootstrap';
import '../styles/progressTracking.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './navigation';

const ProgressTracking = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error('Error fetching user:', userError);
          return;
        }
        setUserId(user.id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchSubscribedCourses = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('course_playlist')
          .select('course_id, progress, courses (title)')
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

        setSubscribedCourses(data);
        const progressData = data.reduce((acc, course) => {
          acc[course.course_id] = course.progress || 0;
          return acc;
        }, {});
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching subscribed courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribedCourses();
  }, [userId]);

  const handleProgressChange = (courseId, event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      setProgress(prevProgress => ({
        ...prevProgress,
        [courseId]: value
      }));
    }
  };

  const handleSaveProgress = async () => {
    setIsLoading(true);
    try {
      const progressUpdates = Object.keys(progress).map(courseId => ({
        user_id: userId,
        course_id: courseId,
        progress: progress[courseId]
      }));
  
      const { error } = await supabase
        .from('course_playlist')
        .upsert(progressUpdates, { onConflict: ['user_id', 'course_id'] });
  
      if (error) {
        throw error;
      }
  
      console.log('Progress updated successfully');
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const getProgressVariant = (value) => {
    if (value < 50) {
      return 'danger';
    } else if (value < 90) {
      return 'warning';
    } else {
      return 'success';
    }
  };

  return (
    <div>
      <Navigation />
      <div className="progress-container">
        <h1>Track Your Progress</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="progress-list">
            {subscribedCourses.map((course, index) => (
              <div key={`${course.course_id}-${userId}-${index}`} className="progress-item">
                <h2>{course.courses.title}</h2>
                <ProgressBar
                  now={progress[course.course_id] || 0}
                  label={`${progress[course.course_id] || 0}%`}
                  variant={getProgressVariant(progress[course.course_id] || 0)}
                />
                <Form.Control
                  type="number"
                  value={progress[course.course_id] || 0}
                  onChange={event => handleProgressChange(course.course_id, event)}
                  placeholder="Enter progress"
                  min="0"
                  max="100"
                  className="mt-2"
                />
              </div>
            ))}
            <Button onClick={handleSaveProgress} className="mt-3">
              Save Progress
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracking;
