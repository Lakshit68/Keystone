import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) navigate('/admin');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const resp = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage(data.error || 'Login failed');
        return;
      }
      // Do not persist token; require login on each access
      navigate('/admin', { state: { fromLogin: true } });
    } catch (err) {
      setMessage('Network error');
    }
  };

  const handleInitialRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const resp = await fetch('http://localhost:5001/api/auth/register-initial', {
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={handleInitialRegister}
            className="w-full bg-gray-100 text-gray-800 py-2 rounded border mt-2 hover:bg-gray-200"
          >
            First-time Setup (Register Admin)
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


