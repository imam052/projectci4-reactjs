import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      const newUser = { name, email, phone };
      await axios.post('/api/users', newUser);
      fetchUsers();
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Add User</h2>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Phone"
            />
          </div>
          <button onClick={createUser} className="btn btn-primary">Add User</button>
        </div>
        <div className="col-md-6">
          <h2>User List</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user.id} className="list-group-item d-flex justify-content-between">
                <div>
                  <span className="fw-bold">{user.username}</span> | {user.password} 
                </div>
                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
