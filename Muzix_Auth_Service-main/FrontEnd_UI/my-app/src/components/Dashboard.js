import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/movieService';
import MovieCard from './MovieCard';

const Dashboard = ({ user, token, onLogout }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError('');
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error loading popular movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      // If search is empty, load popular movies
      loadPopularMovies();
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setError('');
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search - search after user stops typing for 500ms
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 500);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome to Netflix!</h1>
          <p>Discover and explore thousands of movies</p>
        </div>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <div className="search-icon">🔍</div>
          </div>
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery('');
                handleSearch('');
              }}
            >
              Clear Search
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="movies-section">
          <h2>
            {searchQuery ? 
              `Search Results for "${searchQuery}"` : 
              'Popular Movies'
            }
          </h2>
          
          {loading || isSearching ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>{isSearching ? 'Searching movies...' : 'Loading movies...'}</p>
            </div>
          ) : movies.length > 0 ? (
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="no-movies">
              <p>
                {searchQuery ? 
                  'No movies found for your search.' : 
                  'No movies available at the moment.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;