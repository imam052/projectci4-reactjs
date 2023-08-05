import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { name, email, phone, department, position };
      await axios.post('/api/employees', newEmployee); // Ganti dengan endpoint API pegawai Anda
      alert('Employee added successfully!');
      // Setelah berhasil menambahkan pegawai, Anda dapat mengarahkan pengguna ke halaman daftar pegawai
      // dengan menggunakan react-router-dom history atau useHistory hook jika Anda menggunakan functional component.
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Employee</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            placeholder="Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-control"
            placeholder="Department"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="form-control"
            placeholder="Position"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
