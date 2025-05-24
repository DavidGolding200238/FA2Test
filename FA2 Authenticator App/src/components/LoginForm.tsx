import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../utils/authUtils';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pattern, setPattern] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const EmojiPat = (emoji: string) => {
    console.log('Selected emoji:', emoji);
    setPattern([...pattern, emoji]);
  };

  const handleResetPattern = () => {
    setPattern([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const Emoji = pattern.join('');
    console.log('Login attempt:', { username, password, Emoji });
    const success = await Login(username, password, Emoji);
    if (success) {
      console.log('Login successful');
      navigate('/dashboard');
    } else {
      setError('Invalid username, password, or emoji pattern');
      console.log('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>Emoji Pattern</label>
        <div>
          <button type="button" onClick={() => EmojiPat('😊')}>😊</button>
          <button type="button" onClick={() => EmojiPat('🚀')}>🚀</button>
          <button type="button" onClick={() => EmojiPat('🌟')}>🌟</button>
          <button type="button" onClick={() => EmojiPat('🔥')}>🔥</button>
        </div>
        <p>Selected: {pattern.join(' ')}</p>
        <button type="button" onClick={handleResetPattern}>Reset Pattern</button>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
      <p>
        Don't have an account?{' '}
        <button type="button" onClick={() => navigate('/register')}>
          Register here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;