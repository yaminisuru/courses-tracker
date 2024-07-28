import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import '../styles/subscribedCourses.css';
import Navigation from './navigation';

const SubscribedCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'subscribed';
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          navigate('/login');
          return;
        }

        const { data: playlistData, error: playlistError } = await supabase
          .from('course_playlist')
          .select('course_id, progress')
          .eq('user_id', user.id);

        if (playlistError) {
          throw playlistError;
        }

        const courseIds = playlistData
          .filter(course => {
            switch (filter) {
              case 'subscribed':
                return course.progress === 0;
              case 'in-progress':
                return course.progress > 0 && course.progress < 100;
              case 'finished':
                return course.progress === 100;
              default:
                return false;
            }
          })
          .map(course => course.course_id);

        const { data: courses, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .in('course_id', courseIds);

        if (courseError) {
          throw courseError;
        }

        setSubscribedCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [filter, navigate]);

  return (
    <div>
      <Navigation filter={filter} setSearchParams={setSearchParams} />
      <div className="subscribed-courses-container">
        <h1>Your Courses</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="courses-grid">
            {error && <p>{error}</p>}
            {subscribedCourses.length === 0 && <p style={{color:"black"}}>You have no courses in this category.</p>}
            {subscribedCourses.map((course) => (
              <div key={course.course_id} className="course-item">
                <h3>{course.title}</h3>
                <p>Duration: {course.duration} hours</p>
                <p>Rating: {course.rating}</p>
                <p>Level: {course.level}</p>
                <p>Category: {course.category}</p>
                <a href={course.url} target="_blank" rel="noopener noreferrer">Go to course</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribedCourses;
