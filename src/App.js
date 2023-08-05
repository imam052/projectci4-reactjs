import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:8080/users/login', {
        username,
        password,
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };
  <Router>
    <Routes>
      <Route path="/add-employee" element={AddEmployee} />
    </Routes>
  </Router>
  
  return (
    <div className="container mt-5">
      {isLoggedIn ? (
        <>
          <h1>Project Test</h1>
            {users.map((user) => (
              <li key={user.id} className="list-group-item">
                {user.username}
              </li>
            ))}
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Logout
          </button>
          <EmployeeList />
        </>
      ) : (
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h1>Login</h1>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary me-2" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;