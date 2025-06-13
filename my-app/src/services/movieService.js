const API_BASE_URL = 'http://localhost:8080/api/movies';

const getAuthHeaders = (token) => ({
  'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
  'Content-Type': 'application/json'
});

export const getPopularMovies = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/popular`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTrendingMovies = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trending`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getTopRatedMovies = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/top-rated`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const searchMovies = async (query, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};