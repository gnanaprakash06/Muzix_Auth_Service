import React, { useState, useEffect } from 'react';
import { getPopularMovies, getTrendingMovies, getTopRatedMovies, searchMovies } from '../services/movieService';
import '../styles/App.css';

const Dashboard = ({ user, token, onLogout }) => {
  const [movies, setMovies] = useState({
    popular: [],
    trending: [],
    topRated: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, [token]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const [popularData, trendingData, topRatedData] = await Promise.all([
        getPopularMovies(token),
        getTrendingMovies(token),
        getTopRatedMovies(token)
      ]);

      setMovies({
        popular: popularData.movies?.results || [],
        trending: trendingData.movies?.results || [],
        topRated: topRatedData.movies?.results || []
      });
    } catch (err) {
      setError('Failed to load movies');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const results = await searchMovies(searchQuery, token);
        setSearchResults(results.movies?.results || []);
      } catch (err) {
        console.error('Search error:', err);
      }
    }
  };

  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '/placeholder-movie.jpg';
  };

  const MovieRow = ({ title, movies }) => (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="movie-list">
        {movies.slice(0, 6).map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={getImageUrl(movie.poster_path)} 
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="netflix-dashboard">
        <div className="netflix-header">
          <div className="header-left">
            <h1 className="netflix-logo">NETFLIX</h1>
            <nav className="nav-menu">
              <a href="#" className="nav-item active">Home</a>
              <a href="#" className="nav-item">Favourites</a>
              <a href="#" className="nav-item">Subscriptions</a>
            </nav>
          </div>
          <div className="header-right">
            <span className="user-greeting">Hi, {user?.email?.split('@')[0] || 'User'}</span>
          </div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="netflix-dashboard">
      {/* Netflix Header */}
      <div className="netflix-header">
        <div className="header-left">
          <h1 className="netflix-logo">NETFLIX</h1>
          <nav className="nav-menu">
            <a href="#" className="nav-item active">Home</a>
            <a href="#" className="nav-item">Favourites</a>
            <a href="#" className="nav-item">Subscriptions</a>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </div>
          <div className="user-menu-container">
            <div 
              className="user-greeting"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              Hi, {user?.email?.split('@')[0] || 'User'} ▼
            </div>
            {showUserMenu && (
              <div className="user-dropdown">
                <a href="#" className="dropdown-item">Your Account</a>
                <a href="#" className="dropdown-item">Edit Profile</a>
                <button onClick={onLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <MovieRow title={`Search Results for "${searchQuery}"`} movies={searchResults} />
        )}
        
        {/* Movie Rows */}
        <MovieRow title="Trending Now" movies={movies.trending} />
        <MovieRow title="Popular Movies" movies={movies.popular} />
        <MovieRow title="Top Rated" movies={movies.topRated} />
      </div>
    </div>
  );
};

export default Dashboard;