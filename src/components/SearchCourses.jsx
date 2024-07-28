import React, { useState, useEffect } from 'react';
import supabase from '../utils/supabaseClient';
import { FaExternalLinkAlt, FaBookmark } from 'react-icons/fa';
import '../styles/searchCourses.css';
import Navigation from './navigation';

const categories = ['Web Development', 'Graphic Design', 'Musical Instruments', 'Business Finance'];

const categoryFilters = {
  'Business Finance': { maxDuration: 71.5, minDuration: 0, maxRating: 1, minRating: 0 },
  'Web Development': { maxDuration: 76.5, minDuration: 0.5, maxRating: 1, minRating: 0 },
  'Musical Instruments': { maxDuration: 38, minDuration: 0.48, maxRating: 1, minRating: 0 },
  'Graphic Design': { maxDuration: 78.5, minDuration: 0.5, maxRating: 0.01, minRating: 0.99 },
};

const levels = ['All Levels', 'Beginner Level', 'Intermediate Level'];

const SearchCourses = () => {
  const [userId, setUserId] = useState(null);
  const [searchCategory, setSearchCategory] = useState('');
  const [courses, setCourses] = useState([]);
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({
    minDuration: '',
    maxDuration: '',
    minRating: '',
    maxRating: '',
    level: '',
  });
  const [enabledFilters, setEnabledFilters] = useState({
    duration: false,
    rating: false,
    level: false,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        // Handle case where user is not authenticated
        console.error('User is not authenticated');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchSubscribedCourses = async () => {
      if (!userId) return; // Exit if userId is not available

      try {
        const { data, error } = await supabase
          .from('course_playlist')
          .select('course_id')
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

        setSubscribedCourses(data.map(course => course.course_id));
      } catch (error) {
        console.error('Error fetching subscribed courses:', error);
      }
    };

    fetchSubscribedCourses();
  }, [userId]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSearchCategory(selectedCategory);

    // Set filters based on the selected category
    if (categoryFilters[selectedCategory]) {
      setFilters(prevFilters => ({
        ...prevFilters,
        ...categoryFilters[selectedCategory]
      }));
    } else {
      // Clear filters if no category is selected
      setFilters({
        minDuration: '',
        maxDuration: '',
        minRating: '',
        maxRating: '',
        level: '',
      });
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleEnabledFilterChange = (event) => {
    const { name, checked } = event.target;
    setEnabledFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .ilike('category', `%${searchCategory}%`);

      if (error) {
        throw error;
      }

      const filteredCourses = data.filter(course => {
        const durationFilter = !enabledFilters.duration || 
          (course.duration >= parseFloat(filters.minDuration) && course.duration <= parseFloat(filters.maxDuration));
        const ratingFilter = !enabledFilters.rating || 
          (course.rating >= parseFloat(filters.minRating) && course.rating <= parseFloat(filters.maxRating));
        const levelFilter = !enabledFilters.level || filters.level === 'All Levels' || 
          course.level === filters.level;

        return (
          !subscribedCourses.includes(course.course_id) &&
          durationFilter &&
          ratingFilter &&
          levelFilter
        );
      });

      setCourses(filteredCourses);
      setMessage(filteredCourses.length === 0 ? 'No courses found.' : '');
    } catch (error) {
      console.error('Error fetching courses:', error);
      setMessage('Error fetching courses.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (courseId) => {
    if (!userId) return; // Exit if userId is not available

    try {
      // Insert into course_playlist
      const { error } = await supabase
        .from('course_playlist')
        .insert([{ user_id: userId, course_id: courseId, progress: 0 }]);

      if (error) {
        throw error;
      }

      // Update state to include the newly subscribed course
      setSubscribedCourses([...subscribedCourses, courseId]);
    } catch (error) {
      console.error('Error subscribing to course:', error);
    }
  };

  const handleUnsubscribe = async (courseId) => {
    if (!userId) return; // Exit if userId is not available

    try {
      // Remove from course_playlist
      const { error } = await supabase
        .from('course_playlist')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId);

      if (error) {
        throw error;
      }

      // Update state to remove the unsubscribed course
      setSubscribedCourses(subscribedCourses.filter(id => id !== courseId));
    } catch (error) {
      console.error('Error unsubscribing from course:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="search-container">
        <h1>Search Courses</h1>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-bar">
            <select
              className="search-select"
              value={searchCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button type="submit" className="search-button">Search</button>
          </div>
          <div className="filters">
            <label>
              <input
                type="checkbox"
                name="duration"
                checked={enabledFilters.duration}
                onChange={handleEnabledFilterChange}
              />
              Duration
            </label>
            {enabledFilters.duration && (
              <>
                <input
                  type="number"
                  name="minDuration"
                  placeholder="Min Duration"
                  value={filters.minDuration}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
                <input
                  type="number"
                  name="maxDuration"
                  placeholder="Max Duration"
                  value={filters.maxDuration}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </>
            )}
            <label>
              <input
                type="checkbox"
                name="rating"
                checked={enabledFilters.rating}
                onChange={handleEnabledFilterChange}
              />
              Rating
            </label>
            {enabledFilters.rating && (
              <>
                <input
                  type="number"
                  step="0.1"
                  name="minRating"
                  placeholder="Min Rating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
                <input
                  type="number"
                  step="0.1"
                  name="maxRating"
                  placeholder="Max Rating"
                  value={filters.maxRating}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </>
            )}
            <label>
              <input
                type="checkbox"
                name="level"
                checked={enabledFilters.level}
                onChange={handleEnabledFilterChange}
              />
              Level
            </label>
            {enabledFilters.level && (
              <select
                name="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="filter-select"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            )}
          </div>
        </form>
        {isLoading ? (
          <p>Loading courses...</p>
        ) : (
          <>
            <div className="courses-list">
              {courses.map(course => (
                <div key={course.course_id} className="course-item">
                  <h2>{course.title}</h2>
                  <p>Duration: {course.duration} hours</p>
                  <p>Rating: {course.rating}</p>
                  <p>Level: {course.level}</p>
                  <p>Category: {course.category}</p>
                  <p className="platform-label">Platform: Udemy</p>
                  <div className="course-buttons">
                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                      View Course <FaExternalLinkAlt style={{ marginLeft: '5px' }} />
                    </a>
                    {subscribedCourses.includes(course.course_id) ? (
                      <button className="subscribed-button" onClick={() => handleUnsubscribe(course.course_id)}>
                        Subscribed <FaBookmark style={{ marginLeft: '5px' }} />
                      </button>
                    ) : (
                      <button className="subscribe-button" onClick={() => handleSubscribe(course.course_id)}>
                        Subscribe <FaBookmark style={{ marginLeft: '5px' }} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {message && <p>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchCourses;
