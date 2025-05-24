import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthenticated(!!sessionStorage.getItem('user'));
    setLoading(false);
  }, []);

  return { authenticated, loading };
};

export const register = async (username: string, password: string, emoji: string): Promise<boolean> => {
  if (!username || !password || !emoji) {
    console.log('Registration failed: Missing fields', { username, password, emoji });
    return false;
  }
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, emoji }),
    });
    const text = await response.text();
    console.log('Raw response:', text);
    const data = JSON.parse(text);
    if (response.ok && data.success) {
      console.log('Registered user:', { username, emoji });
      sessionStorage.setItem('user', JSON.stringify({ username }));
      return true;
    } else {
      console.log('Registration failed:', data.error || 'Unknown error');
      return false;
    }
  } catch (err) {
    console.error('Registration error:', err);
    return false;
  }
};

export const Login = async (username: string, password: string, emoji: string): Promise<boolean> => {
  if (!username || !password || !emoji) {
    console.log('Login failed: Missing fields', { username, password, emoji });
    return false;
  }
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, emoji }),
    });
    const data = await response.json();
    if (response.ok && data.success) {
      console.log('Login successful');
      sessionStorage.setItem('user', JSON.stringify({ username }));
      return true;
    } else {
      console.log('Login failed:', data.error || 'Invalid credentials');
      return false;
    }
  } catch (err) {
    console.error('Login error:', err);
    return false;
  }
};

export const Logout = () => {
  console.log('Logout: Clearing sessionStorage');
  sessionStorage.removeItem('user');
};