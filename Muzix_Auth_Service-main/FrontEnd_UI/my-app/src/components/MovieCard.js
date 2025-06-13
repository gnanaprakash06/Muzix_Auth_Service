import React from 'react';
import { getImageUrl } from '../services/movieService';

const MovieCard = ({ movie }) => {
  const imageUrl = getImageUrl(movie.poster_path);
  
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
            }}
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          <span className="movie-rating">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
        <p className="movie-overview">
          {movie.overview ? 
            (movie.overview.length > 150 ? 
              movie.overview.substring(0, 150) + '...' : 
              movie.overview
            ) : 
            'No description available'
          }
        </p>
      </div>
    </div>
  );
};

export default MovieCard;