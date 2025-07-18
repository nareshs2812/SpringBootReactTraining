import React, { useState } from 'react';
import './SearchEmployee.css';
import axios from 'axios';

const SearchEmployee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({ name: '' });

  const handleSearch = async () => {
    if (searchTerm.trim().toLowerCase() === 'varshedhaa v r') {
      setEmployee({ id: 18, name: 'Varshedhaa V R' });
    } else {
      setEmployee(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', form);
      alert('Registered Successfully!');
    } catch (error) {
      console.error('Registration Error', error);                                 
      alert('Error while registering');
    }
  };

  return (
    <div className="search-container">
      <header className="header">
        <div className="logo">EMS</div>
        <div className="nav-buttons">
          <button className="btn add">Add</button>
          <button className="btn employees">Employees</button>
          <button className="btn logout">Logout</button>
        </div>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Varshedhaa V R"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn search" onClick={handleSearch}>Search</button>
      </div>

      <div className="form-card">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Add Employees</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter employee name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employee ? (
              <tr>
                <td>{employee.id}</td>
                <td><a href="#">{employee.name}</a></td>
                <td>
                  <button className="btn edit">Edit</button>
                  <button className="btn delete">Delete</button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="3" className="no-result">No employee found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchEmployee;
