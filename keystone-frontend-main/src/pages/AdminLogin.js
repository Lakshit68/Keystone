import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) navigate('/admin');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoggingIn(true);
    try {
      const resp = await fetch('https://keystone-backend-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }
      navigate('/admin', { state: { fromLogin: true } });
    } catch (err) {
      setMessage('Network error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInitialRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsRegistering(true);
    try {
      const resp = await fetch('https://keystone-backend-1.onrender.com/api/auth/register-initial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage(data.error || 'Registration failed');
        return;
      }
      setMessage('Admin initialized. You can now log in.');
    } catch (err) {
      setMessage('Network error');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h1>
        {message && (
          <div className="mb-4 text-sm text-red-600">{message}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            loading={isLoggingIn}
            disabled={isRegistering}
          >
            {isLoggingIn ? 'Logging In...' : 'Log In'}
          </Button>
          <Button
            type="button"
            onClick={handleInitialRegister}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border"
            loading={isRegistering}
            disabled={isLoggingIn}
          >
            {isRegistering ? 'Registering...' : 'First-time Setup (Register Admin)'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


