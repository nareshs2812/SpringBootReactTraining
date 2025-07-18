import React, { useEffect, useState } from 'react';
import './EmployeeList.css'; // Optional external styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/api/employees') // Replace with your actual backend endpoint
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error('Error fetching employees:', err));
  }, []);

  return (
    <div className="employee-container">
      <h2 className="employee-title">📋 Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                <a href={`/employee/${emp.id}`} className="employee-link">
                  {emp.name}
                </a>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="btn edit">
                    📝 Edit
                  </button>
                  <button className="btn delete">
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
