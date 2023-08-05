import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import AddEmployee from './AddEmployee';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pegawai');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:8080/pegawai/${id}`);
        fetchEmployees();
    }  
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Employee List</h1>
      {/* <Link to="/add-employee" className="btn btn-primary mb-3">Add Employee</Link> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>NIP</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.nip}</td>
              <td>{employee.firtsname} {employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>{employee.photo}</td>
              <td>
                <button onClick={() => deleteEmployee(employee.id)} className="button is-small is-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
