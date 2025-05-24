import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login as AuthLogin } from '../utils/authUtils';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pattern, setPattern] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmojiClick = (emoji: string) => {
    console.log('Selected emoji:', emoji);
    setPattern([...pattern, emoji]);
  };

  const handleResetPattern = () => {
    setPattern([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emojiPattern = pattern.join('');
    console.log('Login attempt:', { username, password, emojiPattern });
    const success = await AuthLogin(username, password, emojiPattern);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username, password, or emoji pattern');
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
        <label>Emoji Pattern (use the same pattern you registered)</label>
        <div>
          <button type="button" onClick={() => handleEmojiClick('😊')}>😊</button>
          <button type="button" onClick={() => handleEmojiClick('🚀')}>🚀</button>
          <button type="button" onClick={() => handleEmojiClick('🌟')}>🌟</button>
          <button type="button" onClick={() => handleEmojiClick('🔥')}>🔥</button>
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