const API_BASE_URL = 'http://localhost:8080';

// Login user
export const loginUser = async (credentials) => {
  try {
    console.log('Making login request to backend...');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    console.log('Login response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    console.log('Login response data:', data);
    
    return data;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    console.log('Making registration request to backend...');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password
      }),
    });

    console.log('Registration response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.text(); // Backend returns string message
    console.log('Registration response:', data);
    
    return { message: data };
  } catch (error) {
    console.error('Registration service error:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (passwordData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwordData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Password change failed');
    }

    const data = await response.text();
    return { message: data };
  } catch (error) {
    console.error('Change password service error:', error);
    throw error;
  }
};