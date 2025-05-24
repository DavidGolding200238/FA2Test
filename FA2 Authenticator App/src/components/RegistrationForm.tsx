import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../utils/authUtils';

const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pattern, setPattern] = useState<string[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Emoji = (emoji: string) => {
    console.log('Selected emoji:', emoji);
    setPattern([...pattern, emoji]);
  };

  const handleResetPattern = () => {
    setPattern([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emoji = pattern.join('');
    console.log('Registration attempt:', { username, password, emoji, patternLength: pattern.length });
    if (pattern.length < 2) {
      setError('Please select at least 2 emojis');
      console.log('Registration failed: Less than 2 emojis');
      return;
    }
    const success = await register(username, password, emoji);
    if (success) {
      console.log('Registration successful');
      navigate('/dashboard');
    } else {
      setError('Registration failed: Username may already exist or server error');
      console.log('Registration failed');
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
        <label>Emoji Pattern (select at least two)</label>
        <div>
          <button type="button" onClick={() => Emoji('😊')}>😊</button>
          <button type="button" onClick={() => Emoji('🚀')}>🚀</button>
          <button type="button" onClick={() => Emoji('🌟')}>🌟</button>
          <button type="button" onClick={() => Emoji('🔥')}>🔥</button>
        </div>
        <p>Selected: {pattern.join(' ')}</p>
        <button type="button" onClick={handleResetPattern}>Reset Pattern</button>
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;